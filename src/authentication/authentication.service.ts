import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { AuthUserInterface } from './interfaces/auth-user.interface';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import { RoleInterface } from 'src/modules/roles/interfaces/role.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user: AuthUserInterface = await this.usersService.findUserByEmailLogin(email);
    await this.usersService.checkUserPassword(user.id, password);

    return user;
  }

  async makeToken(data: UserInterface & { currentRole: RoleInterface }) {
    const currentRole = data.currentRole;
    const payload = { id: data.id, username: data.username, currentRole };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
