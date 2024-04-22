import { HttpException, HttpStatus, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { StudentInterface } from 'src/modules/students/interfaces/student.interface';

@Injectable()
export class CourseIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async checkRepository(id: number): Promise<number> {
    try {
      const course = await this.courseRepository.findOneOrFail({ where: { id } });
      return course.id;
    } catch (error) {
      throw new HttpException({ message: `Não foi possível encontrar o curso com o Id: ${id}.` }, HttpStatus.NOT_FOUND);
    }
  }

  async transform(argument: number | StudentInterface): Promise<any> {
    if (typeof argument === 'number') {
      const course = await this.checkRepository(argument);
      if (!course) {
        throw new NotFoundException(
          'Curso não encontrado',
          `Não foi possível encontrar um curso com esse I: ${argument}`,
        );
      }
      return argument;
    } else {
      const promises = argument.courses.map((course) => {
        return this.checkRepository(course.id);
      });

      await Promise.all(promises);
      return argument;
    }
  }
}
