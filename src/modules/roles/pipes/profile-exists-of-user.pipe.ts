import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileInterface } from '../interfaces/profile.interface';

@Injectable()
export class ProfileExistsOfUserPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async transform(data: any): Promise<void> {
    try {
      const profile: ProfileInterface = await this.profileRepository.findOneOrFail({
        where: {
          userId: data.userId,
          roleId: data.roleId,
        },
      });

      if (profile) {
        throw new HttpException({ message: 'O usuário já possue esse perfil.' }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }
}
