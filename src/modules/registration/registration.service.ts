import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationEntity } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { RegistrationInterface } from './interfaces/registration.interface';
@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private registrationRepository: Repository<RegistrationEntity>,
  ) {}

  async findAll(): Promise<RegistrationInterface[]> {
    try {
      return await this.registrationRepository.find();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as matrículas.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findByUserId(userId: number): Promise<RegistrationInterface[]> {
    try {
      return await this.registrationRepository.find({
        where: { userId },
        relations: ['course'],
        select: {
          course: {
            id: true,
            description: true,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as matrículas deste usuários.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<RegistrationInterface> {
    try {
      return await this.registrationRepository.findOneOrFail({
        where: { id },
        relations: ['course', 'user'],
        select: {
          user: {
            id: true,
            username: true,
            email: true,
          },
          course: {
            id: true,
            description: true,
          },
        },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esta matrícula.' }, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: CreateRegistrationDto): Promise<{ registration: RegistrationInterface; message: string }> {
    try {
      const entity = Object.assign(new RegistrationEntity(), data);
      const registration = await this.registrationRepository.save(entity);

      return { registration, message: 'A matrícula foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar a matrícula.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    data: UpdateRegistrationDto,
  ): Promise<{ registration: RegistrationInterface; message: string }> {
    try {
      const entity: RegistrationEntity = Object.assign(new RegistrationEntity(), { ...data, id });
      await this.registrationRepository.save(entity);

      const registration = await this.findOne(id);
      return { registration, message: 'A matrícula foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar a matrícula.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.registrationRepository.softDelete(id);
      return { message: 'Matrícula removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir a matrícula.' }, HttpStatus.BAD_REQUEST);
    }
  }
}
