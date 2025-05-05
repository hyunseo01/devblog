import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CheckNicknameDto } from './dto/check-nickname.dto';
import { SubmitUserDto } from './dto/submit-user.dto';

@ApiTags('User')
@Controller('user')
export class UserPublicController {
  constructor(private readonly userService: UserService) {}

  @Post('check-nickname')
  @ApiOperation({ summary: '닉네임 중복 확인' })
  @ApiResponse({ status: 200, description: '중복 확인 결과 반환' })
  checkNickname(@Body() dto: CheckNicknameDto) {
    return this.userService.checkNickname(dto);
  }

  @Post('submit')
  @ApiOperation({ summary: '회원가입 or 로그인' })
  @ApiResponse({ status: 200, description: '로그인 or 회원가입 성공' })
  submit(@Body() dto: SubmitUserDto) {
    return this.userService.submit(dto);
  }
}
