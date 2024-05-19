import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';
import { CheckRole } from 'src/shared/utils/check-role.util';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class UserContainsBusinessProfilePipe implements PipeTransform<any> {
  constructor(
    private readonly userService: UsersService,

    private readonly checkRole: CheckRole,
  ) {}

  async transform(data: CreateCourseDto): Promise<any> {
    try {
      const user: UserInterface = await this.userService.findOne(data.userId);
      if (!this.checkRole.containsBusiness(user)) {
        throw new HttpException({ message: 'O usuário não possue o perfil de empresa.' }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
    return data;
  }
}
