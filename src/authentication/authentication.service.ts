import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmailLogin(email);

    await this.usersService.checkUserPassword(user.id, password);

    const payload = { id: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
