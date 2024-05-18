import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileInterface } from './interfaces/profile.interface';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { RoleInterface } from './interfaces/role.interface';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleInterface[]> {
    try {
      return await this.roleRepository.find({
        select: {
          id: true,
          name: true,
        }
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os papeis do sistema.' }, HttpStatus.NOT_FOUND);
    }
  }

  async createProfile(data: CreateProfileDto): Promise<{ profile: ProfileInterface; message: string }> {
    try {
      const entity = Object.assign(new ProfileEntity(), data);
      const profile = await this.profileRepository.save(entity);

      return { profile, message: 'O perfil foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar o perfil.' }, HttpStatus.BAD_REQUEST);
    }
  }
}
