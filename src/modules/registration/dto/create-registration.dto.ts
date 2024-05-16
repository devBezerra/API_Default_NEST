import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegistrationDto {
  @IsNumber({}, { message: 'O campo de id de usuário precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id de usuário é obrigatório.' })
  userId: number;

  @IsNumber({}, { message: 'O campo de id de usuário precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id de usuário é obrigatório.' })
  courseId: number;
}
