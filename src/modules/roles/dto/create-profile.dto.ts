import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @IsNumber({}, { message: 'O campo de id de usuário precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id de usuário é obrigatório.' })
  userId: number;

  @IsNumber({}, { message: 'O campo de id de papel precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id de papel é obrigatório.' })
  roleId: number;
}
