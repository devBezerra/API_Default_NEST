import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_SECRET,
      secret: process.env.API_SECRET,
      secretOrPrivateKey: process.env.API_SECRET
    });
  }
  validate(payload: string): string {
    return payload;
  }
}
