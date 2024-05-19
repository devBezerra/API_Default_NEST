import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';

@Injectable()
export class CheckRole {
  isAdmin(user: UserInterface): boolean {
    if (user.currentProfile.role.name === 'Admin') {
      return !!user;
    }
    return !user;
  }

  containsStudent(user: UserInterface): boolean {
    const student = user.profiles.find((profile) => {
      return profile.role.name === 'Student'
    })

    return !!student
  }
}
