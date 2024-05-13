import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async signIn(email: string, password: string): Promise<AuthUserInterface> {
    try {
      const user: AuthUserInterface = await this.usersService.findUserByEmailLogin(email);
      await this.usersService.checkUserPassword(user.id, password);
      return user;
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível realizar o login, tente novamente mais tarde.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  makeToken(data: UserInterface): { access_token: string } {
    const payload = { id: data.id, username: data.username, currentRole: data.currentRole };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
