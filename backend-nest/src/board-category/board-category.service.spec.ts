import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoryService } from './board-category.service';

describe('BoardCategoryService', () => {
  let service: BoardCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardCategoryService],
    }).compile();

    service = module.get<BoardCategoryService>(BoardCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
