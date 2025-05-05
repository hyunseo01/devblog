import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardListQueryDto } from './dto/board-list-query.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '게시글 작성 (관리자 전용)' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Response })
  create(@Body() dto: CreateBoardDto, @Req() req: Request) {
    return this.boardService.create(
      dto,
      req.user as { userId: number; role: 'admin' | 'user' },
    );
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findAll(@Query() query: BoardListQueryDto) {
    return this.boardService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.getDetail(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '게시글 수정 (관리자 전용)' })
  @ApiResponse({ status: 200, description: '수정 성공', type: Response })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBoardDto,
    @Req() req: Request,
  ) {
    return this.boardService.update(
      id,
      dto,
      req.user as { userId: number; role: 'admin' | 'user' },
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '게시글 삭제 (관리자 전용)' })
  @ApiResponse({ status: 200, description: '삭제 성공', type: Response })
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.boardService.delete(
      id,
      req.user as { userId: number; role: 'admin' | 'user' },
    );
  }
}
