// import { WorkListQueryDto } from '../../work/dto/work-list-query.dto';

/** 페이징 로직 */
// export function getPagination(query: WorkListQueryDto) {
//   const page = query.page && query.page > 0 ? query.page : 1; //0페이지일떄는 1페이지로
//   const pageSize = query.pageSize && query.pageSize > 0 ? query.pageSize : 5;
//   return {
//     page,
//     pageSize,
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//   };
// }
export const getPagination = (query: {
  page?: string | number;
  pageSize?: string | number;
}) => {
  const page = query.page ? parseInt(query.page as string) : 1;
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 5;
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
};
