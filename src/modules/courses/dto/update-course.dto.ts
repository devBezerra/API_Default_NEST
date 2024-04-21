import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
    @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
    id: number;  
}
