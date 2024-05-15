import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseInterface } from './interfaces/course.interface';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { FindAllCoursesDocs } from 'src/shared/docs/courses/courses-find-all.docs';
import { FindOneCourseDocs } from 'src/shared/docs/courses/courses-find-one.docs';
import { CreateCourseDocs } from 'src/shared/docs/courses/courses-create.docs';
import { UpdateCourseDocs } from 'src/shared/docs/courses/courses-update.docs';
import { DeleteCourseDocs } from 'src/shared/docs/courses/courses-delete.docs';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enum/role';
import { AuthGuard } from 'src/common/auth.guard';

@ApiTags('Cursos')
@Controller('courses')
@UseGuards(AuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @FindAllCoursesDocs()
  @Get()
  @Roles(Role.Admin, Role.Student)
  async findAll(): Promise<CourseInterface[]> {
    return await this.coursesService.findAll();
  }

  @FindOneCourseDocs()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CourseInterface> {
    return await this.coursesService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Get('user/:id')
  async findByUserId(@Param('id', ParseIntPipe) userId: number): Promise<CourseInterface[]> {
    return await this.coursesService.findByUserId(+userId);
  }

  @CreateCourseDocs()
  @Post()
  @Roles(Role.Business)
  async create(@Body() data: CreateCourseDto): Promise<{ course: CourseInterface; message: string }> {
    return await this.coursesService.create(data);
  }

  @UpdateCourseDocs()
  @Patch(':id')
  @Roles(Role.Business)
  async update(
    @Body() data: UpdateCourseDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ course: CourseInterface; message: string }> {
    return this.coursesService.update(+id, data);
  }

  @DeleteCourseDocs()
  @Delete(':id')
  @Roles(Role.Business)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.coursesService.remove(+id);
  }
}
