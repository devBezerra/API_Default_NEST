import { IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { CourseDescriptionAlreadyExists } from '../validate/course-name-already-exists.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Título do curso',
    default: 'Título teste',
  })
  @Validate(CourseDescriptionAlreadyExists, { message: 'Já existe um curso com esta descrição.' })
  @IsString({ message: 'O campo de descrição precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de descrição é obrigatório.' })
  @MinLength(3, { message: 'O campo de descrição precisa ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O campo de descrição pode ter no máximo 50 caracteres.' })
  description: string;

  @ApiProperty({
    description: 'Ementa do curso',
    default:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  })
  @IsString({ message: 'O campo de ementa precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de ementa é obrigatório.' })
  @MinLength(3, { message: 'O campo de ementa precisa ter pelo menos 3 caracteres.' })
  @MaxLength(1000, { message: 'O campo de ementa pode ter no máximo 1000 caracteres.' })
  syllabus: string;
}
