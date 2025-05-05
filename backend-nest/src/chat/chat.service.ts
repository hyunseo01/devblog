import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveMessage(
    userId: number,
    role: 'user' | 'admin',
    content: string,
  ): Promise<ChatMessage> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다');
    }

    const nickname = role === 'admin' ? `[관리자] ${user.name}` : user.name;

    const chat = this.chatRepository.create({
      userId,
      role,
      nickname,
      content,
    });

    return await this.chatRepository.save(chat);
  }

  // async getAllMessages(): Promise<ChatMessage[]> {
  //   return await this.chatRepository.find({
  //     order: { createdAt: 'ASC' },
  //   });
  // }

  async getMessages(cursor?: number): Promise<ChatMessage[]> {
    const query = this.chatRepository
      .createQueryBuilder('chat')
      .orderBy('chat.createdAt', 'DESC')
      .limit(20);

    if (cursor) {
      const cursorMessage = await this.chatRepository.findOneBy({ id: cursor });
      if (cursorMessage) {
        query.andWhere('chat.createdAt < :cursorTime', {
          cursorTime: cursorMessage.createdAt,
        });
      }
    }

    const result = await query.getMany();
    return result.reverse();
  }

  async deleteMessage(
    id: number,
    requester: { userId: number; isAdmin: boolean },
  ) {
    const message = await this.chatRepository.findOneBy({ id });
    if (!message) throw new NotFoundException('메시지를 찾을 수 없습니다');

    const isOwner = message.userId === requester.userId;
    if (!isOwner && !requester.isAdmin) {
      throw new ForbiddenException('삭제 권한이 없습니다');
    }

    await this.chatRepository.delete(id);
    return { success: true };
  }
}
