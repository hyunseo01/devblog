import {
  Strategy as JwtStrategyBase,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase, 'jwt') {
  constructor(configService: ConfigService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'mysecret',
      ignoreExpiration: false,
    };
    super(options);
  }

  validate(payload: { sub: number; role: string }) {
    return { userId: payload.sub, role: payload.role };
  }
}
