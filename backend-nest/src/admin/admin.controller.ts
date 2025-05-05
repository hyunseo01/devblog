import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signin')
  @ApiOperation({ summary: '관리자 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공', type: Response })
  signin(@Body() dto: SigninAdminDto) {
    return this.adminService.signin(dto);
  }
}
