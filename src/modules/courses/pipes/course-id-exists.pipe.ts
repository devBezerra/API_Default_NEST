import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';

interface ContainsCourseId {
  courseId: number;
}

@Injectable()
export class CourseIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async transform(id: number | ContainsCourseId): Promise<number> {
    if (typeof id === 'object') {
      id = id.courseId;
    }
    try {
      await this.courseRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: `Não foi possível encontrar o curso com o Id: ${id}.` }, HttpStatus.NOT_FOUND);
    }
    return id;
  }
}
