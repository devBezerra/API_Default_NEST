import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ProfileInterface } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileExistsOfUserPipe } from './pipes/profile-exists-of-user.pipe';
import { AdminOrUserGuard } from 'src/common/admin-or-user.guard';
import { Public } from 'src/decorators/public.decorator';
import { RoleInterface } from './interfaces/role.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Public()
  async getAll(): Promise<RoleInterface[]> {
    return await this.rolesService.findAll();
  }
  
  @Post('profile')
  @UseGuards(AdminOrUserGuard)
  async createProfile(
    @Body(ProfileExistsOfUserPipe) data: CreateProfileDto,
  ): Promise<{ profile: ProfileInterface; message: string }> {
    return await this.rolesService.createProfile(data);
  }
}
