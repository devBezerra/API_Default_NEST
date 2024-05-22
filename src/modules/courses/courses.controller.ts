import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UsePipes } from '@nestjs/common';
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
import { UserContainsBusinessProfilePipe } from './pipes/user-contains-business-profile.pipe';
import { CourseIdExistPipe } from './pipes/course-id-exists.pipe';

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
  @UsePipes(ParseIntPipe)
  async findOne(@Param('id') id: number): Promise<CourseInterface> {
    return await this.coursesService.findOne(+id);
  }

  @Get('user/:id')
  @Roles(Role.Admin)
  @UsePipes(ParseIntPipe)
  async findByUserId(@Param('id') userId: number): Promise<CourseInterface[]> {
    return await this.coursesService.findByUserId(+userId);
  }

  @CreateCourseDocs()
  @Post()
  @Roles(Role.Admin, Role.Business)
  @UsePipes(UserContainsBusinessProfilePipe)
  async create(@Body() data: CreateCourseDto): Promise<{ course: CourseInterface; message: string }> {
    return await this.coursesService.create(data);
  }

  @UpdateCourseDocs()
  @Patch(':id')
  @Roles(Role.Admin, Role.Business)
  @UsePipes(ParseIntPipe, CourseIdExistPipe)
  async update(
    @Body() data: UpdateCourseDto,
    @Param('id') id: number,
  ): Promise<{ course: CourseInterface; message: string }> {
    return this.coursesService.update(+id, data);
  }

  @DeleteCourseDocs()
  @Delete(':id')
  @Roles(Role.Admin, Role.Business)
  @UsePipes(ParseIntPipe, CourseIdExistPipe)
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.coursesService.remove(+id);
  }
}
