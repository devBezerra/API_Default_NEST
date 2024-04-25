import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentInterface } from './interfaces/student.interface';
import { StudentIdExistPipe } from './pipes/student-id-exists.pipe';
import { CourseIdExistPipe } from '../courses/pipes/course-id-exists.pipe';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllStudentsDocs } from 'src/shared/docs/students/students-find-all.docs';
import { FindOneStudentDocs } from 'src/shared/docs/students/students-find-one.docs';
import { CreateStudentDocs } from 'src/shared/docs/students/students-create.docs';
import { UpdateStudentDocs } from 'src/shared/docs/students/students-update.docs';
import { DeleteStudentDocs } from 'src/shared/docs/students/students-delete.docs';

@ApiTags('Alunos')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @FindAllStudentsDocs()
  @Get()
  async findAll(): Promise<StudentInterface[]> {
    return await this.studentsService.findAll();
  }

  @FindOneStudentDocs()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<StudentInterface> {
    return await this.studentsService.findOne(+id);
  }

  @CreateStudentDocs()
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<{ student: StudentInterface; message: string }> {
    return await this.studentsService.create(createStudentDto);
  }

  @UpdateStudentDocs()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe, StudentIdExistPipe) id: string,
    @Body(CourseIdExistPipe) updateStudentDto: UpdateStudentDto,
  ): Promise<{ student: StudentInterface; message: string }> {
    return await this.studentsService.update(+id, updateStudentDto);
  }

  @DeleteStudentDocs()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe, StudentIdExistPipe) id: string): Promise<{ message: string }> {
    return await this.studentsService.remove(+id);
  }
}
