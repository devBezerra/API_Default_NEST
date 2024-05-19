import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UsePipes } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/shared/enum/role';
import { AdminOrUserGuard } from 'src/common/admin-or-user.guard';
import { RegistrationInterface } from './interfaces/registration.interface';
import { YourRegistrationGuard } from 'src/common/your-registration.guard';
import { RegistrationUserCourseExistsPipe } from './pipes/registration-user-course-exists.pipe';
import { RegistrationIdExistsPipe } from './pipes/registration-id-exists.pipe';
import { UserContainsStudentProfilePipe } from './pipes/user-contains-student-profile.pipe';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<RegistrationInterface[]> {
    return await this.registrationService.findAll();
  }

  @Get('user/:id')
  @Roles(Role.Admin, Role.Student)
  @UseGuards(AdminOrUserGuard)
  async findByUser(@Param('id', ParseIntPipe) userId: number): Promise<RegistrationInterface[]> {
    return await this.registrationService.findByUserId(+userId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Student)
  @UseGuards(YourRegistrationGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RegistrationInterface> {
    return await this.registrationService.findOne(+id);
  }

  @Post()
  @Roles(Role.Admin, Role.Student)
  @UseGuards(AdminOrUserGuard)
  @UsePipes(UserContainsStudentProfilePipe, RegistrationUserCourseExistsPipe)
  async create(
    @Body() data: CreateRegistrationDto,
  ): Promise<{ registration: RegistrationInterface; message: string }> {
    return await this.registrationService.create(data);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Student)
  @UseGuards(YourRegistrationGuard)
  async update(
    @Param('id', ParseIntPipe, RegistrationIdExistsPipe) id: number,
    @Body() data: UpdateRegistrationDto,
  ): Promise<{ registration: RegistrationInterface; message: string }> {
    return await this.registrationService.update(+id, data);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Student)
  @UseGuards(YourRegistrationGuard)
  async remove(@Param('id', ParseIntPipe, RegistrationIdExistsPipe) id: number): Promise<{ message: string }> {
    return await this.registrationService.remove(+id);
  }
}
