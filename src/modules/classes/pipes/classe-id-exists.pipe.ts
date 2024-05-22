import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from '../entities/class.entity';

@Injectable()
export class ClasseIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classeRepository: Repository<ClassEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    try {
      await this.classeRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: `Não foi possível encontrar a aula com o Id: ${id}.` }, HttpStatus.NOT_FOUND);
    }
    return id;
  }
}
