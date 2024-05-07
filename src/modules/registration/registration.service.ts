import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationEntity } from './entities/registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private registrationRepository: Repository<RegistrationEntity>,
  ) {}
  findAll() {
    return `This action returns all registration`;
  }

  async findByUserId(userId: number) {
    try {
      return await this.registrationRepository.find({ where: { userId }, relations: ['course'] });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as matrículas deste usuários' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  create(createRegistrationDto: CreateRegistrationDto) {
    return 'This action adds a new registration';
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
