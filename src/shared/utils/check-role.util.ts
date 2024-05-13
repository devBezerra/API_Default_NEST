import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';

@Injectable()
export class CheckRole {
  isAdmin(user: UserInterface): boolean {
    if (user.currentRole.name === 'Admin') {
      return !!user;
    }
    return !user;
  }
}
