import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new HttpException({ message: `Não foi possível encontrar o aluno com o Id: ${id}.` }, HttpStatus.NOT_FOUND);
    }

    return id;
  }
}
