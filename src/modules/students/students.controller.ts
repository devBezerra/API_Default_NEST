import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentInterface } from './interfaces/student.interface';
import { StudentIdExistPipe } from './pipes/student-id-exists.pipe';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { CourseIdExistPipe } from '../courses/pipes/course-id-exists.pipe';

@ApiTags('Alunos')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll(): Promise<StudentInterface[]> {
    return await this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<StudentInterface> {
    return await this.studentsService.findOne(+id);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<{ student: StudentInterface; message: string }> {
    return await this.studentsService.create(createStudentDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe, StudentIdExistPipe) id: string,
    @Body(CourseIdExistPipe) updateStudentDto: UpdateStudentDto,
  ): Promise<{ student: StudentInterface; message: string }> {
    return await this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe, StudentIdExistPipe) id: string): Promise<{ message: string }> {
    return await this.studentsService.remove(+id);
  }
}
