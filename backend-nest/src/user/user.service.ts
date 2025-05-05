import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { SubmitUserDto } from './dto/submit-user.dto';
import { CheckNicknameDto } from './dto/check-nickname.dto';
import { Response } from '../common/response/response';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  //이미 가입된 닉네임일떄 -> 본인 여부 판단
  async checkNickname(dto: CheckNicknameDto) {
    const { name, userId } = dto;
    const user = await this.userRepository.findOne({ where: { name } });
    console.log('닉네임 검사 결과:', user);

    if (!user) {
      return new Response(true, '닉네임 사용 가능', { status: 'available' });
    }

    if (userId && user.id == userId) {
      return new Response(true, '본인이 사용하던 닉네임입니다', {
        status: 'owned',
      });
    }

    return new Response(false, '이미 다른 사용자가 사용 중인 닉네임입니다', {
      status: 'conflict',
    });
  }

  //로그인 or 회원가입 처리
  async submit(dto: SubmitUserDto) {
    const { name, password } = dto;
    const existingUser = await this.userRepository.findOne({ where: { name } });

    // 이미 존재 → 로그인
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        throw new UnauthorizedException({
          success: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      }

      const token = this.authService.signToken(existingUser.id, 'user');

      return new Response(true, '로그인 성공', {
        id: existingUser.id,
        name: existingUser.name,
        token,
      });
    }

    // 존재 안하면 → 신규 가입
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.save({
      name,
      password: hashed,
    });

    const token = this.authService.signToken(newUser.id, 'user');

    return new Response(true, '회원가입 완료', {
      id: newUser.id,
      name: newUser.name,
      token,
    });
  }

  async findAll() {
    const users = await this.userRepository.find();
    return new Response(true, '유저 목록 조회 성공', users);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return new Response(false, '유저를 찾을 수 없습니다.');
    }
    return new Response(true, '유저 조회 성공', user);
  }

  async updateUser(id: number, data: { name?: string; password?: string }) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return new Response(false, '유저가 존재하지 않습니다');
    }

    if (data.name) user.name = data.name;
    if (data.password) {
      const hashed = await bcrypt.hash(data.password, 10);
      user.password = hashed;
    }

    const updated = await this.userRepository.save(user);
    return new Response(true, '유저 수정 완료', updated);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return new Response(false, '유저가 존재하지 않습니다');
    }

    await this.userRepository.remove(user);
    return new Response(true, '유저 삭제 완료');
  }
}
