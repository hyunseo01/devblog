import { Controller, Get } from '@nestjs/common';
import { BoardCategoryService } from './board-category.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Board Category')
@Controller('board-category')
export class BoardCategoryController {
  constructor(private readonly boardCategoryService: BoardCategoryService) {}

  @Get()
  @ApiOperation({ summary: '게시판 카테고리 전체 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findAll() {
    return this.boardCategoryService.findAll();
  }
}
