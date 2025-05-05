import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(dto: SigninAdminDto) {
    const { adminId, password } = dto;

    const admin = await this.adminRepository.findOne({
      where: { adminId },
    });

    console.log('🧪 입력한 adminId:', adminId, '| 타입:', typeof adminId);
    console.log(
      '🧪 DB에서 찾은 admin.adminId:',
      admin?.adminId,
      '| 타입:',
      typeof admin?.adminId,
    );
    console.log('🧪 admin 전체:', admin);
    console.log('🧪 입력 비번:', `"${password}"`, '| 길이:', password.length);

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('비활성 관리자거나 존재하지 않음');
    }

    try {
      const trimmedPassword = password.trim();
      const isMatch = await bcrypt.compare(trimmedPassword, admin.password);
      console.log('🧪 입력 비번:', password);
      console.log('🧪 DB 비번 해시:', admin.password);
      console.log('🧪 비밀번호 일치 여부:', isMatch);

      if (!isMatch) {
        throw new UnauthorizedException('비밀번호 불일치');
      }
    } catch (error) {
      console.error('❌ bcrypt.compare 에러 발생:', error);
      throw new UnauthorizedException('내부 오류: 비밀번호 검증 실패');
    }

    const payload = { sub: admin.id, role: 'admin' };
    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      message: '로그인 성공',
      token: accessToken,
    };
  }
}
