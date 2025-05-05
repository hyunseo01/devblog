import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Work } from './entities/work.entity';
import { WorkTag } from '../work-tag/entities/work-tag.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { Response } from '../common/response/response';
import { AuthRequest } from '../common/auth-request';
import { WorkListQueryDto } from './dto/work-list-query.dto';
import { getPagination } from '../common/utils/pagination.util';
import { getSortCondition } from '../common/utils/sort.util';
import { Comment } from '../comment/entities/comment.entity';
import { UpdateWorkDto } from './dto/update-work.dto';
import { getSearchFilter } from '../common/board/boardFun';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
    @InjectRepository(WorkTag)
    private readonly workTagRepository: Repository<WorkTag>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  /** 작업물 등록 */
  async create(dto: CreateWorkDto, user: AuthRequest['user']) {
    if (user.role !== 'admin') {
      throw new ForbiddenException(
        new Response(false, '작업물 등록은 관리자만 가능합니다.'),
      );
    }

    const tags = await this.workTagRepository.findBy({ id: In(dto.tagIds) });

    const newWork = this.workRepository.create({
      title: dto.title,
      content: dto.content,
      projectUrl: dto.projectUrl,
      repoUrl: dto.repoUrl,
      role: dto.role,
      startDate: dto.startDate,
      endDate: dto.endDate,
      highlighted: dto.highlighted,
      tags,
    });

    const saved = await this.workRepository.save(newWork);

    return new Response(true, '작업물 등록 완료', saved);
  }

  /** 작업물 리스트 (페이징, 정렬, 검색, 태그 필터) */
  // async findAll(dto: WorkListQueryDto) {
  //   const { page, pageSize, skip, take } = getPagination(dto);
  //   const sortCondition = getSortCondition(dto.sortBy ?? 'recommended');
  //
  //   // tagIds를 안전하게 배열로 변환
  //   let tagIds: number[] = [];
  //   if (dto.tagIds) {
  //     if (Array.isArray(dto.tagIds)) {
  //       tagIds = dto.tagIds.map((id) => Number(id));
  //     } else {
  //       tagIds = [Number(dto.tagIds)];
  //     }
  //   }
  //
  //   let workIds: number[] = [];
  //
  //   // 1. 먼저 조건에 맞는 work id들만 조회
  //   if (tagIds.length > 0) {
  //     const rawIds = await this.workRepository
  //       .createQueryBuilder('work')
  //       .leftJoin('work.tags', 'tag')
  //       .where('tag.id IN (:...tagIds)', { tagIds })
  //       .groupBy('work.id')
  //       .having('COUNT(DISTINCT tag.id) = :tagCount', {
  //         tagCount: tagIds.length,
  //       })
  //       .select('work.id', 'id')
  //       .getRawMany();
  //
  //     workIds = rawIds.map((row) => row.id);
  //
  //     if (workIds.length === 0) {
  //       // 조건에 맞는 작업물이 없으면 바로 빈 응답
  //       return new Response(true, `정렬 기준: ${dto.sortBy || 'recommended'}`, {
  //         items: [],
  //         total: 0,
  //         page,
  //         pageSize,
  //       });
  //     }
  //   }
  //
  //   // 2. 그 workIds로 다시 전체 tags 포함해서 조회
  //   const queryBuilder = this.workRepository
  //     .createQueryBuilder('work')
  //     .leftJoinAndSelect('work.tags', 'tag');
  //
  //   // 검색어 필터
  //   if (dto.search) {
  //     queryBuilder.andWhere('work.title LIKE :search', {
  //       search: `%${dto.search}%`,
  //     });
  //   }
  //
  //   // 태그 필터가 있을 경우 work.id 조건 추가
  //   if (workIds.length > 0) {
  //     queryBuilder.andWhere('work.id IN (:...workIds)', { workIds });
  //   }
  //
  //   // 정렬
  //   Object.entries(sortCondition).forEach(([field, order]) => {
  //     if (
  //       order === 'ASC' ||
  //       order === 'DESC' ||
  //       order === 'asc' ||
  //       order === 'desc'
  //     ) {
  //       queryBuilder.addOrderBy(
  //         `work.${field}`,
  //         (order as 'ASC' | 'DESC').toUpperCase() as 'ASC' | 'DESC',
  //       );
  //     }
  //   });
  //
  //   // 페이징
  //   queryBuilder.skip(skip).take(take);
  //
  //   const [works, total] = await queryBuilder.getManyAndCount();
  //
  //   const items = works.map((work) => ({
  //     id: work.id,
  //     title: work.title,
  //     preview: work.content.substring(0, 50),
  //     createdAt: work.createdAt.toISOString(),
  //     tags: work.tags.map((tag) => ({
  //       id: tag.id,
  //       name: tag.name,
  //     })),
  //   }));
  //
  //   return new Response(true, `정렬 기준: ${dto.sortBy || 'recommended'}`, {
  //     items,
  //     total,
  //     page,
  //     pageSize,
  //   });
  // }
  async findAll(dto: WorkListQueryDto) {
    // 1. 페이지네이션 계산
    const { page, pageSize, skip, take } = getPagination(dto);

    // 2. 정렬 조건 설정
    const sortCondition = getSortCondition(dto.sortBy ?? 'recommended');

    // 3. 검색어 필터 생성 (title OR content)
    const searchFilter = getSearchFilter<Work>(dto.search, [
      'title',
      'content',
    ]);

    // 4. 태그 ID 파싱 및 배열화
    let tagIds: number[] = [];
    if (dto.tagIds) {
      tagIds = Array.isArray(dto.tagIds)
        ? dto.tagIds.map(Number)
        : [Number(dto.tagIds)];
    }

    // 5. 태그 조건이 있을 경우 work.id 목록 추출 (AND 조건)
    let workIdList: number[] | null = null;
    if (tagIds.length > 0) {
      type IdOnly = { id: number };
      //작업물과 태그 조인하여 쿼리 시작
      const rawIds: IdOnly[] = await this.workRepository
        .createQueryBuilder('work')
        //work.tags 다대다 관계 조인
        .leftJoin('work.tags', 'tag')
        //전달받은 tagIds 중 하나라도 포함된 태그만 필터링
        .where('tag.id IN (:...tagIds)', { tagIds })
        //같은 work.id를 하나로 묶음
        .groupBy('work.id')
        //선택한 모든 태그가 포함된 경우만 통과 (AND 조건)
        .having('COUNT(DISTINCT tag.id) = :tagCount', {
          tagCount: tagIds.length,
        })
        //work.id만 선택해서 결과 반환
        .select('work.id', 'id')
        //[{ id: number }] 형태의 배열로 가져옴
        .getRawMany();

      workIdList = rawIds.map((row) => row.id);

      //조건에 맞는 작업물이 없으면 빈 결과 반환
      if (workIdList.length === 0) {
        return new Response(true, '작업물 없음', {
          items: [],
          total: 0,
          page,
          pageSize,
        });
      }
    }

    // 6. where 조건 조립 (타입 안정성 확보)
    const baseWhere: Partial<Record<keyof Work, any>> = !Array.isArray(
      searchFilter,
    )
      ? { ...searchFilter }
      : {};

    if (workIdList) baseWhere.id = In(workIdList);

    // 7. 실제 작업물 조회
    const [works, total] = await this.workRepository.findAndCount({
      where: Array.isArray(searchFilter)
        ? (searchFilter as Record<string, any>[]).map((filter) => ({
            ...filter,
            ...baseWhere,
          }))
        : baseWhere,
      order: sortCondition,
      skip,
      take,
      relations: ['tags'],
    });

    // 8. 응답 포맷 구성
    const items = works.map((work) => ({
      id: work.id,
      title: work.title,
      preview: work.content.substring(0, 50),
      createdAt: work.createdAt.toISOString(),
      highlighted: work.highlighted,
      tags: work.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    }));

    // 9. 최종 응답 반환
    return new Response(true, '작업물 목록 조회 성공', {
      items,
      total,
      page,
      pageSize,
    });
  }

  /** 작업물 상세 */
  async getDetail(id: number) {
    const work = await this.workRepository.findOne({
      where: { id },
      relations: ['tags', 'tags.category'],
    });

    if (!work) {
      throw new NotFoundException('작업물을 찾을 수 없습니다.');
    }

    const comments = await this.commentRepository.find({
      where: {
        commentableType: 'work',
        commentableId: id,
      },
      order: { createdAt: 'DESC' },
    });

    return new Response(true, '작업물 상세 조회 성공', {
      id: work.id,
      title: work.title,
      content: work.content,
      projectUrl: work.projectUrl,
      repoUrl: work.repoUrl,
      role: work.role,
      startDate: work.startDate,
      endDate: work.endDate,
      highlighted: work.highlighted,
      createdAt: work.createdAt,
      updatedAt: work.updatedAt,
      tags: work.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        category: tag.category?.name ?? null,
      })),
      comments: comments.map((c) => ({
        id: c.id,
        nickname: c.nickname,
        content: c.content,
        createdAt: c.createdAt,
      })),
    });
  }

  /** 작업물 수정 */
  async update(id: number, dto: UpdateWorkDto) {
    const work = await this.workRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!work) throw new NotFoundException('작업물을 찾을 수 없습니다.');

    // 태그 변경 시
    if (dto.tagIds) {
      work.tags = await this.workTagRepository.findBy({ id: In(dto.tagIds) });
    }

    Object.assign(work, {
      title: dto.title ?? work.title,
      content: dto.content ?? work.content,
      projectUrl: dto.projectUrl ?? work.projectUrl,
      repoUrl: dto.repoUrl ?? work.repoUrl,
      role: dto.role ?? work.role,
      startDate: dto.startDate ?? work.startDate,
      endDate: dto.endDate ?? work.endDate,
      highlighted: dto.highlighted ?? work.highlighted,
    });

    const saved = await this.workRepository.save(work);
    return new Response(true, '작업물 수정 완료', saved);
  }

  /** 작업물 삭제 */
  async delete(id: number, user: AuthRequest['user']) {
    if (user.role !== 'admin') {
      throw new ForbiddenException(
        new Response(false, '작업물 삭제는 관리자만 가능합니다.'),
      );
    }

    const work = await this.workRepository.findOne({ where: { id } });
    if (!work) throw new NotFoundException('작업물을 찾을 수 없습니다.');

    await this.workRepository.remove(work);
    return new Response(true, '작업물 삭제 완료');
  }
}
