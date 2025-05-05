import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '유저 전체 조회 (관리자)' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 단건 조회 (관리자)' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Response })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '유저 수정 (관리자)' })
  @ApiResponse({ status: 200, description: '수정 성공', type: Response })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      name?: string;
      password?: string;
    },
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제 (관리자)' })
  @ApiResponse({ status: 200, description: '삭제 성공', type: Response })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
