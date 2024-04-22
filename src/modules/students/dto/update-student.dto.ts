import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';
import { UpdateCourseDto } from 'src/modules/courses/dto/update-course.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;

  @IsOptional()
  @IsArray({ message: 'Cursos: O campo de cursos precisa ser uma lista.' })
  @Type(() => UpdateCourseDto)
  courses?: UpdateCourseDto[];
}
