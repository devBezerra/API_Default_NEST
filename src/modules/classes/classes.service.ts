import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { ClasseInterface } from './interfaces/classes.interface';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private classRepository: Repository<ClassEntity>,
  ) {}

  async findAll(): Promise<ClasseInterface[]> {
    try {
      return await this.classRepository.find();
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esta classe.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<ClasseInterface> {
    try {
      return await this.classRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar esta classe.' }, HttpStatus.NOT_FOUND);
    }
  }

  async findByCourseId(id: number): Promise<ClasseInterface[]> {
    try {
      return await this.classRepository.find({
        where: { courseId: id },
      });
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível encontrar as classes deste curso.' }, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: CreateClassDto): Promise<{ classe: ClasseInterface; message: string }> {
    try {
      const entitie: ClassEntity = Object.assign(data);
      const classe: ClasseInterface = await this.classRepository.save(entitie);

      return { classe, message: 'A aula foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível criar a aula.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, data: UpdateClassDto): Promise<{ classe: ClasseInterface; message: string }> {
    try {
      const entity: ClassEntity = Object.assign(new ClassEntity(), { ...data, id });
      await this.classRepository.save(entity);
      const classe = await this.findOne(id);
      return { classe, message: 'A aula foi atualizada com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível atualizar a aula.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.classRepository.softDelete(id);
      return { message: 'A aula foi excluida com sucesso.' };
    } catch (error) {
      throw new HttpException({ message: 'Não foi possível excluir a aula.' }, HttpStatus.NOT_FOUND);
    }
  }
}
