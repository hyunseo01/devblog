import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 작성' })
  @ApiResponse({ status: 201, description: '작성 성공', type: Response })
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '댓글 대상별 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findByTarget(
    @Query('type') type: 'work' | 'board',
    @Query('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.findByTarget(type, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({ status: 200, description: '수정 성공', type: Response })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '댓글 삭제 (비회원)' })
  @ApiResponse({ status: 200, description: '삭제 성공', type: Response })
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('password') password: string,
  ) {
    return this.commentService.delete(id, password);
  }

  @Delete('admin/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '댓글 삭제 (관리자)' })
  @ApiResponse({ status: 200, description: '삭제 성공', type: Response })
  forceDelete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.forceDelete(id);
  }
}
