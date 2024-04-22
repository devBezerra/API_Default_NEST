import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentInterface } from './interfaces/student.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async findAll(): Promise<StudentInterface[]> {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os alunos.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<StudentInterface> {
    try {
      return await this.studentRepository
      .findOneOrFail({
         where: { id },
         relations: ['courses'],
         select: {
          courses: {
            id: true,
            description: true
          }
         } 
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o aluno.' }, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: CreateStudentDto): Promise<{ student: StudentInterface; message: string }> {
    try {
      const entity = Object.assign(new StudentEntity(), data);
      const student = await this.studentRepository.save(entity);
      return { student, message: 'O aluno foi criado com sucesso' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar o aluno.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, data: UpdateStudentDto): Promise<{ student: StudentInterface; message: string }> {
    try {
      const entity = Object.assign(new StudentEntity(), { ...data, id });
      const student = await this.studentRepository.save(entity);

      return { student, message: 'O aluno foi editado com sucesso' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível editar o aluno.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      await this.studentRepository.softDelete(id);
      return { message: 'Aluno removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o aluno.' }, HttpStatus.BAD_REQUEST);
    }
  }
}
