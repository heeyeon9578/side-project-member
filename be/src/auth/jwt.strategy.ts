// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          // ✅ 1. 쿠키에서
          if (req?.cookies?.accessToken) {
            console.log('🍪 쿠키 토큰 사용!');
            return req.cookies.accessToken;
          }

          // ✅ 2. 헤더에서
          if (req?.headers?.authorization?.startsWith('Bearer ')) {
            console.log('🪪 헤더 토큰 사용!');
            return req.headers.authorization.split(' ')[1];
          }

          return null;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
