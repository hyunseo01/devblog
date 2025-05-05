import { FindOptionsOrder } from 'typeorm';
import { Work } from '../../work/entities/work.entity';

export type SortOrder = 'recommended' | 'latest' | 'oldest';

// export function getSortCondition(sortBy?: SortOrder): FindOptionsOrder<Work> {
//   switch (sortBy) {
//     case 'latest':
//       return { createdAt: 'desc' };
//     case 'oldest':
//       return { createdAt: 'asc' };
//     default:
//       return { highlighted: 'desc', createdAt: 'asc' };
//   }
// }
export const getSortCondition = (
  sortBy?: SortOrder,
): FindOptionsOrder<Work> => {
  switch (sortBy) {
    case 'latest':
      return { createdAt: 'desc' };
    case 'oldest':
      return { createdAt: 'asc' };
    default:
      return { highlighted: 'desc', createdAt: 'asc' };
  }
};
