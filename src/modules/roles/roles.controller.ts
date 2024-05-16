import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ProfileInterface } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('profile')
  async createProfile(@Body() data: CreateProfileDto): Promise<{ profile: ProfileInterface; message: string }> {
    return await this.rolesService.createProfile(data);
  }
}
