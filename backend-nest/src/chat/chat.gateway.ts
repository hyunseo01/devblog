import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { CreateChatDto } from './dto/create-chat.dto';

export interface SocketWithAuth extends Socket {
  data: {
    user: {
      id: number;
      role: 'user' | 'admin';
    };
  };
}

interface UserPayload {
  id: number;
  role: 'user' | 'admin';
}

interface ClientSocket extends Socket {
  data: {
    user?: UserPayload;
  };
}

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: ClientSocket): void {
    const handshakeAuth = client.handshake.auth as Record<string, unknown>;

    if (typeof handshakeAuth.token !== 'string' || !handshakeAuth.token) {
      console.warn('토큰이 유효하지 않음');
      client.disconnect();
      return;
    }

    const token = handshakeAuth.token;

    try {
      const decoded = this.jwtService.verify<{
        sub: number;
        role: 'user' | 'admin';
      }>(token);
      client.data.user = {
        id: decoded.sub,
        role: decoded.role,
      };
      console.log(`연결됨: 유저 ID: ${decoded.sub}`);
    } catch (err) {
      console.error('JWT 인증 실패:', err);
      client.disconnect();
    }
  }

  handleDisconnect(client: ClientSocket): void {
    const userId = client.data.user?.id ?? 'unknown';
    console.log(`연결해제됨: 유저 ID: ${userId}`);
  }

  @SubscribeMessage('chat')
  async handleChat(
    @MessageBody() dto: CreateChatDto,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    const { id, role } = client.data.user;

    const saved = await this.chatService.saveMessage(id, role, dto.content);

    this.server.emit('chat', {
      id: saved.id,
      nickname: saved.nickname,
      content: saved.content,
      createdAt: saved.createdAt,
      userId: saved.userId,
    });
  }
}
