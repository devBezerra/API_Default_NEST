import { PartialType } from '@nestjs/swagger';
import { CreateRegistrationDto } from './create-registration.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  @IsNumber({}, { message: 'O campo de id de usuário precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de id de usuário é obrigatório.' })
  id: number;
}
