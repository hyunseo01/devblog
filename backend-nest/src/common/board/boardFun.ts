// board 전용 유틸 모음
import { Like, MoreThan, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { Board } from '../../board/entities/board.entity';

/** 검색 (title, content) */
export function getSearchFilter<T>(
  keyword: string | undefined,
  fields: (keyof T)[],
): FindOptionsWhere<T>[] | Record<string, unknown> {
  if (!keyword) return {};
  return fields.map((field) => ({
    [field]: Like(`%${keyword}%`),
  })) as FindOptionsWhere<T>[];
}

/** 카테고리 필터 */
export function getBoardCategoryFilter(
  slug?: string,
): FindOptionsWhere<Board> | Record<string, unknown> {
  return slug ? { category: { slug } } : {};
}

/** 정렬 조건 */
export function getBoardSortCondition(
  sortBy?: string,
): FindOptionsOrder<Board> {
  switch (sortBy) {
    case 'oldest':
      return { id: 'ASC' };
    case 'highlighted':
    case 'recommended':
      return { highlighted: 'DESC', id: 'DESC' };
    default:
      return { id: 'DESC' };
  }
}

/** 기간 필터 */
export function getBoardDateRangeFilter(
  sortBy?: string,
): FindOptionsWhere<Board> | Record<string, unknown> {
  const now = new Date();
  const date = new Date();

  switch (sortBy) {
    case 'week':
      date.setDate(now.getDate() - 7);
      break;
    case 'month':
      date.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      date.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return {};
  }

  return { createdAt: MoreThan(date) };
}
