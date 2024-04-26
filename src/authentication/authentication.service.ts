import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmailLogin(email);

    await this.usersService.checkUserPassword(user.id, password);

    return { message: 'Logado com sucesso' };
  }
}
