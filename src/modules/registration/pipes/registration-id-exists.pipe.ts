import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class RegistrationIdExistsPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly registrationRepository: Repository<RegistrationEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    try {
      await this.registrationRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: `Não foi possível encontrar a matrícula com o Id: ${id}.` },
        HttpStatus.NOT_FOUND,
      );
    }

    return id;
  }
}
