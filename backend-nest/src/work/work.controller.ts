import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { WorkListQueryDto } from './dto/work-list-query.dto';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateWorkDto } from './dto/update-work.dto';
import { AuthRequest } from '../common/auth-request';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Work')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '작업물 등록' })
  @ApiResponse({ status: 201, description: '등록 성공', type: Response })
  create(
    @Body() createWorkDto: CreateWorkDto,
    @Req() req: Request & { user: { userId: number; role: 'user' | 'admin' } },
  ) {
    return this.workService.create(createWorkDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: '작업물 목록 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findAll(@Query() dto: WorkListQueryDto) {
    return this.workService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '작업물 상세 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  getWorkDetail(@Param('id', ParseIntPipe) id: number) {
    return this.workService.getDetail(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '작업물 수정' })
  @ApiResponse({ status: 200, description: '수정 성공', type: Response })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkDto) {
    return this.workService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '작업물 삭제' })
  @ApiResponse({ status: 200, description: '삭제 성공', type: Response })
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest, //관리자 정보 받음
  ) {
    return this.workService.delete(id, req.user);
  }
}
