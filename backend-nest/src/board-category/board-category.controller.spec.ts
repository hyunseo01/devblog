import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoryController } from './board-category.controller';
import { BoardCategoryService } from './board-category.service';

describe('BoardCategoryController', () => {
  let controller: BoardCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardCategoryController],
      providers: [BoardCategoryService],
    }).compile();

    controller = module.get<BoardCategoryController>(BoardCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
