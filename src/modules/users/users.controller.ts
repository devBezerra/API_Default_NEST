import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';

import { Role } from 'src/shared/enum/role';
import { UserInterface } from './interfaces/user.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthUserInterface } from 'src/authentication/interfaces/auth-user.interface';
import { Public } from 'src/decorators/public.decorator';

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
  async update(
    @Param('id') id: string,
    @CurrentUser() currentUser: AuthUserInterface,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.usersService.update(+id, currentUser, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser: AuthUserInterface) {
    return await this.usersService.remove(+id, currentUser);
  }
}
