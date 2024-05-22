import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsString({ message: 'O campo de título precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de título é obrigatório.' })
  @MinLength(3, { message: 'O campo de título precisa ter pelo menos 3 caracteres.' })
  @MaxLength(80, { message: 'O campo de título pode ter no máximo 80 caracteres.' })
  title: string;

  @IsString({ message: 'O campo de url precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de url é obrigatório.' })
  @IsUrl({}, { message: 'O campo precisa ser uma URL válida.' })
  url: string;

  @IsNumber({}, { message: 'O campo de Id de curso precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de curso é obrigatório.' })
  courseId: number;
}
