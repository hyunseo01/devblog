import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from '../common/response/response';
import { AuthRequest } from '../common/auth-request';
import { getPagination } from '../common/utils/pagination.util';
import {
  getSearchFilter,
  getBoardSortCondition,
  getBoardDateRangeFilter,
  getBoardCategoryFilter,
} from '../common/board/boardFun';
import { BoardListQueryDto } from './dto/board-list-query.dto';
import { Comment } from '../comment/entities/comment.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateBoardDto, user: AuthRequest['user']) {
    if (user.role !== 'admin') {
      throw new ForbiddenException(
        new Response(false, '게시글 등록은 관리자만 가능합니다.'),
      );
    }

    const board = this.boardRepository.create({ ...dto });
    const saved = await this.boardRepository.save(board);
    return new Response(true, '게시글 등록 완료', saved);
  }

  async findAll(dto: BoardListQueryDto) {
    const { page, pageSize, skip, take } = getPagination(dto);

    const searchFilter = getSearchFilter<Board>(dto.search, [
      'title',
      'content',
    ]);
    const categoryFilter = getBoardCategoryFilter(dto.category);
    const dateFilter = getBoardDateRangeFilter(dto.sort);
    const sortCondition = getBoardSortCondition(dto.sort);

    const finalWhere = Array.isArray(searchFilter)
      ? searchFilter
      : {
          ...searchFilter,
          ...categoryFilter,
          ...dateFilter,
        };

    const [boards, total] = await this.boardRepository.findAndCount({
      where: finalWhere,
      order: sortCondition,
      skip,
      take,
      relations: ['category'],
    });

    const items = boards.map((b) => ({
      id: b.id,
      title: b.title,
      preview: b.content.substring(0, 50),
      category: b.category.label,
      createdAt: b.createdAt.toISOString(),
      highlighted: b.highlighted,
    }));

    return new Response(true, '게시글 목록 조회 성공', {
      items,
      total,
      page,
      pageSize,
    });
  }

  async getDetail(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const comments = await this.commentRepository.find({
      where: {
        commentableType: 'board',
        commentableId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return new Response(true, '게시글 상세 조회 성공', {
      id: board.id,
      title: board.title,
      content: board.content,
      category: board.category?.label || null,
      highlighted: board.highlighted,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      comments: comments.map((c) => ({
        id: c.id,
        nickname: c.nickname,
        content: c.content,
        createdAt: c.createdAt,
      })),
    });
  }

  async update(id: number, dto: UpdateBoardDto, user: AuthRequest['user']) {
    if (user.role !== 'admin') {
      throw new ForbiddenException(
        new Response(false, '게시글 수정은 관리자만 가능합니다.'),
      );
    }

    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    Object.assign(board, dto);
    const saved = await this.boardRepository.save(board);

    return new Response(true, '게시글 수정 완료', saved);
  }

  async delete(id: number, user: AuthRequest['user']) {
    if (user.role !== 'admin') {
      throw new ForbiddenException(
        new Response(false, '게시글 삭제는 관리자만 가능합니다.'),
      );
    }

    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    await this.boardRepository.remove(board);
    return new Response(true, '게시글 삭제 완료');
  }
}
