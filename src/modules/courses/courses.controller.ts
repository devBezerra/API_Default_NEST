import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseInterface } from './interfaces/course.interface';
import { CourseIdExistPipe } from './pipes/course-id-exists.pipe';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllCoursesDocs } from 'src/shared/docs/courses/courses-find-all.docs';
import { FindOneCourseDocs } from 'src/shared/docs/courses/courses-find-one.docs';
import { CreateCourseDocs } from 'src/shared/docs/courses/courses-create.docs';
import { UpdateCourseDocs } from 'src/shared/docs/courses/courses-update.docs';
import { DeleteCourseDocs } from 'src/shared/docs/courses/courses-delete.docs';

@ApiTags('Cursos')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @FindAllCoursesDocs()
  @Get()
  async findAll(): Promise<CourseInterface[]> {
    return await this.coursesService.findAll();
  }

  @FindOneCourseDocs()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CourseInterface> {
    return await this.coursesService.findOne(+id);
  }

  @CreateCourseDocs()
  @Post()
  async create(@Body() data: CreateCourseDto): Promise<{ course: CourseInterface; message: string }> {
    return await this.coursesService.create(data);
  }

  @UpdateCourseDocs()
  @Patch(':id')
  async update(
    @Body() data: UpdateCourseDto,
    @Param('id', ParseIntPipe, CourseIdExistPipe) id: number,
  ): Promise<{ course: CourseInterface; message: string }> {
    return this.coursesService.update(+id, data);
  }

  @DeleteCourseDocs()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe, CourseIdExistPipe) id: number): Promise<{ message: string }> {
    return this.coursesService.remove(+id);
  }
}
