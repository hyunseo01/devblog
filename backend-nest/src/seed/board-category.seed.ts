//작동안됨 추후 구현...
import { DataSource } from 'typeorm';
import { BoardCategory } from '../board-category/entities/board-category.entity';

export const seedBoardCategories = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(BoardCategory);

  const initialCategories = [
    {
      slug: 'devlog',
      label: '개발기록',
      description: '개발 일지, 작업 흐름 정리',
    },
    {
      slug: 'debug',
      label: '에러노트',
      description: '오류 해결, 트러블슈팅 로그',
    },
    {
      slug: 'cs-note',
      label: 'CS정리',
      description: '자료구조, 네트워크 등 CS 정리',
    },
    {
      slug: 'joblog',
      label: '구직활동',
      description: '면접 후기, 이력서 팁, 취준기록',
    },
    {
      slug: 'thoughts',
      label: '잡담',
      description: '잡생각, 회고, 일상 등 자유글',
    },
  ];

  for (const data of initialCategories) {
    const exists = await repo.findOne({ where: { slug: data.slug } });
    if (!exists) {
      await repo.save(repo.create(data));
    }
  }

  console.log('시드 체크1');
};
