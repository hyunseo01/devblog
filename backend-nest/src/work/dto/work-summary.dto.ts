/** 내보낼 작업물 리스트의 각 리스트 형식 */
export class WorkSummaryDto {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
  tags: string[];
}
