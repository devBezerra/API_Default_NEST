import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty({
        description: 'Id do Curso',
        default: 1,
    })
    @IsInt({ message: 'O campo de id precisa ser um inteiro.' })
    @IsNotEmpty({ message: 'O campo de id é obrigatório.' })
    id: number;  
}
