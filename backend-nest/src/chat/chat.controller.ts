import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from '../auth/jwt.guard';
import { AuthRequest } from '../common/auth-request';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @UseGuards(JwtGuard)
  // @Get('messages')
  // getMessages() {
  //   // 토큰 검증 후 전체 메시지 반환
  //   return this.chatService.getAllMessages();
  // }

  @Get('messages')
  async getMessages(@Query('cursor') cursor?: string) {
    const cursorNum = cursor ? parseInt(cursor, 10) : undefined;
    return this.chatService.getMessages(cursorNum);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteMessage(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return this.chatService.deleteMessage(id, {
      userId: req.user.userId,
      isAdmin: req.user.role === 'admin',
    });
  }
}
