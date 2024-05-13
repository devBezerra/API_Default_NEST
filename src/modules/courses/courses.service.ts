import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CourseInterface } from './interfaces/course.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async findAll(): Promise<CourseInterface[]> {
    try {
      return await this.courseRepository.find();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os cursos.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<CourseInterface> {
    try {
      return await this.courseRepository.findOneOrFail({
        where: { id },
        select: { user: { username: true } },
        relations: ['user'],
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o curso.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findByUserId(userId: number): Promise<CourseInterface[]> {
    try {
      return await this.courseRepository.find({ where: { userId } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar os cursos deste usuário.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findByDescription(description: string, course: CourseInterface): Promise<CourseInterface> {
    try {
      const id = course.id || 0;
      return await this.courseRepository.findOne({
        where: {
          description,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar o curso.' }, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: CreateCourseDto): Promise<{ course: CourseInterface; message: string }> {
    try {
      const entity = Object.assign(new CourseEntity(), data);
      const course = await this.courseRepository.save(entity);

      return { course, message: 'O curso foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar o curso.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, data: UpdateCourseDto): Promise<{ course: CourseInterface; message: string }> {
    try {
      const entity: CourseEntity = Object.assign(new CourseEntity(), { ...data, id });
      await this.courseRepository.save(entity);

      const course = await this.findOne(id);
      return { course, message: 'O curso foi atualizado com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar o curso.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.courseRepository.softDelete(id);
      return { message: 'Curso removido com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir o curso' }, HttpStatus.BAD_REQUEST);
    }
  }
}
