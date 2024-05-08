import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';

@Injectable()
export class StudentsExistInCoursePipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const course = await this.courseRepository
    .findOne({ 
        where: { id },
        relations: ['students'] 
    });

    // if (!!course.students.length) {
    //   throw new HttpException({ message: `Existem alunos matriculados a esse curso.` }, HttpStatus.BAD_REQUEST);
    // }

    return id;
  }
}
