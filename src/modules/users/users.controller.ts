import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';

import { Role } from 'src/shared/enum/role';
import { UserInterface } from './interfaces/user.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthUserInterface } from 'src/authentication/interfaces/auth-user.interface';
import { Public } from 'src/decorators/public.decorator';
import { AdminOrUserGuard } from 'src/common/admin-or-user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<UserInterface[]> {
    return await this.usersService.findAll();
  }

  @Get('me')
  async getMe(@CurrentUser() user: AuthUserInterface): Promise<UserInterface> {
    return await this.usersService.getMe(user);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Business)
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return await this.usersService.findOne(+id);
  }

  @Post()
  @Public()
  async create(@Body() data: CreateUserDto): Promise<{ user: UserInterface; message: string }> {
    return await this.usersService.create(data);
  }

  @Patch(':id')
  @UseGuards(AdminOrUserGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AdminOrUserGuard)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
