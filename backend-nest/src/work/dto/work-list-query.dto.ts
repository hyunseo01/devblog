import { IsIn, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SortOrder } from '../../common/utils/sort.util';

export class WorkListQueryDto {
  /** 검색값 */
  @IsOptional()
  @IsString()
  search?: string;

  /** 몇페이지? */
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  /** 한 페이지에 몇개? */
  @IsOptional()
  @Type(() => Number)
  pageSize?: number = 10;

  /** 태그 필터 */
  @IsOptional()
  @Type(() => Number)
  tagIds?: number[];

  /** 정렬 */
  @IsOptional()
  @Type(() => String)
  @IsIn(['recommended', 'latest', 'oldest'])
  sortBy?: SortOrder;
}
