import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'O campo de email precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de email é obrigatório.' })
  @IsEmail({}, { message: 'O campo de email precisa ser um email válido.' })
  @MinLength(3, { message: 'O campo de email precisa ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O campo de email pode ter no máximo 255 caracteres.' })
  email: string;

  @IsString({ message: 'O campo de password precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de password é obrigatório.' })
  @MinLength(3, { message: 'O campo de password precisa ter pelo menos 3 caracteres.' })
  @MaxLength(255, { message: 'O campo de password pode ter no máximo 255 caracteres.' })
  password: string;
}
