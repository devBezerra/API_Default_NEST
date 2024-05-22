import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
    @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
    @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
    id: number;
}
