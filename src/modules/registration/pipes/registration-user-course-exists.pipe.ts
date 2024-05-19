import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationEntity } from '../entities/registration.entity';
import { RegistrationInterface } from '../interfaces/registration.interface';

@Injectable()
export class RegistrationUserCourseExistsPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly registrationRepository: Repository<RegistrationEntity>,
  ) {}

  async transform(data: any): Promise<any> {
    try {
      const registration: RegistrationInterface = await this.registrationRepository.findOne({
        where: {
          userId: data.userId,
          courseId: data.courseId,
        },
      });

      if (registration) {
        throw new HttpException({ message: 'O usuário já está matriculado neste curso.' }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
    return data;
  }
}