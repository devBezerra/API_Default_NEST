import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new HttpException({ message: `Não foi possível encontrar o curso com o ID: ${id}.` }, HttpStatus.NOT_FOUND);
    }

    return id;
  }
}
