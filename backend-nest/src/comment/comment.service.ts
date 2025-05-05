import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import * as bcrypt from 'bcrypt';

/** 비밀번호 검증 함수(나중에 따로 관리) */
async function validateCommentPassword(input: string, hashed: string) {
  const isMatch = await bcrypt.compare(input, hashed);
  if (!isMatch) {
    throw new UnauthorizedException('비밀번호 불일치');
  }
}

/** 댓글 존재 확인 함수(나중에 따로 관리) */
async function findCommentOrThrow(
  repo: Repository<Comment>,
  commentId: number,
): Promise<Comment> {
  const comment = await repo.findOne({ where: { id: commentId } });
  if (!comment) throw new NotFoundException('댓글 없음');
  return comment;
}

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  // 댓글 작성
  async create(dto: CreateCommentDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const comment = this.commentRepo.create({
      ...dto,
      password: hashed,
    });
    await this.commentRepo.save(comment);
    return { success: true, message: '댓글 작성 완료' };
  }

  // 댓글 조회 (작업물 or 게시글)
  async findByTarget(commentableType: 'work' | 'board', commentableId: number) {
    const comments = await this.commentRepo.find({
      where: { commentableType, commentableId },
      order: { createdAt: 'DESC' },
    });

    return comments.map(({ id, nickname, content, createdAt }) => ({
      id,
      nickname,
      content,
      createdAt,
    }));
  }

  // 댓글 수정 (비밀번호)
  async update(commentId: number, dto: UpdateCommentDto) {
    if (!dto.password || !dto.content) {
      throw new BadRequestException('비밀번호와 내용을 모두 입력하세요.');
    }

    const comment = await findCommentOrThrow(this.commentRepo, commentId);
    await validateCommentPassword(dto.password, comment.password);

    comment.content = dto.content;
    await this.commentRepo.save(comment);

    return { success: true, message: '댓글 수정 완료' };
  }

  // 댓글 삭제 (비밀번호)
  async delete(commentId: number, password: string) {
    const comment = await findCommentOrThrow(this.commentRepo, commentId);

    await validateCommentPassword(password, comment.password);

    await this.commentRepo.remove(comment);
    return { success: true, message: '댓글 삭제 완료' };
  }

  // 관리자용 댓글 삭제
  async forceDelete(commentId: number) {
    const comment = await findCommentOrThrow(this.commentRepo, commentId);

    await this.commentRepo.remove(comment);
    return { success: true, message: '관리자 댓글 삭제 완료' };
  }
}
