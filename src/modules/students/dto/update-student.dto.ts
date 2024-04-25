import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';
import { UpdateCourseDto } from 'src/modules/courses/dto/update-course.dto';
import { courseMock } from 'src/shared/docs/courses/courses-mocks.docs';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({
    description: 'Id do Aluno',
    default: 1,
  })
  @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
  @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
  id: number;

  @ApiProperty({
    description: 'Array de cursos',
    default: courseMock,
    type: [UpdateCourseDto]
  })
  @IsOptional()
  @IsArray({ message: 'Cursos: O campo de cursos precisa ser uma lista.' })
  @Type(() => UpdateCourseDto)
  courses?: UpdateCourseDto[];
}
