import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'O campo de nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome é obrigatório.' })
  @MinLength(3, { message: 'O campo de nome precisa ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O campo de nome pode ter no máximo 50 caracteres.' })
  name: string;
}
