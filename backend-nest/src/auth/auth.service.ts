import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(userId: number, role: 'user' | 'admin'): string {
    const payload = { sub: userId, role };
    return this.jwtService.sign(payload);
  }
}
