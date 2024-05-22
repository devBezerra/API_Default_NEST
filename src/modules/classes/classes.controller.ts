import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClasseInterface } from './interfaces/classes.interface';
import { CourseIdExistPipe } from '../courses/pipes/course-id-exists.pipe';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enum/role';
import { ClasseIdExistPipe } from './pipes/classe-id-exists.pipe';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async findAll(): Promise<ClasseInterface[]> {
    return await this.classesService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseIntPipe)
  async findOne(@Param('id') id: number): Promise<ClasseInterface> {
    return await this.classesService.findOne(+id);
  }

  @Get('courses/:id')
  @UsePipes(ParseIntPipe, CourseIdExistPipe)
  async findByCourseId(@Param('id') id: number): Promise<ClasseInterface[]> {
    return await this.classesService.findByCourseId(+id);
  }

  @Post()
  @Roles(Role.Admin, Role.Student)
  @UsePipes(CourseIdExistPipe)
  async create(@Body() data: CreateClassDto): Promise<{ classe: ClasseInterface; message: string }> {
    return await this.classesService.create(data);
  }

  @Patch(':id')
  @UsePipes(CourseIdExistPipe, ClasseIdExistPipe)
  async update(
    @Param('id') id: number,
    @Body() data: UpdateClassDto,
  ): Promise<{ classe: ClasseInterface; message: string }> {
    return await this.classesService.update(+id, data);
  }

  @Delete(':id')
  @UsePipes(ParseIntPipe, ClasseIdExistPipe)
  async remove(@Param('id') id: number): Promise<{message: string}> {
    return await this.classesService.remove(+id);
  }
}
