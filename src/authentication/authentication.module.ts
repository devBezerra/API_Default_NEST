require('dotenv').config();
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/providers/authentication/jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      // secretOrPrivateKey: 'yagsdyutwafwdayuisdwadaw',
      signOptions: {
        expiresIn: '300s',
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy, AuthenticationService, JwtService, JwtModule],
})
export class AuthenticationModule {}
