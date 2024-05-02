import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';

import { Role } from 'src/shared/enum/role';
import { UserInterface } from './interfaces/user.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthUserInterface } from 'src/authentication/interfaces/auth-user.interface';

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
