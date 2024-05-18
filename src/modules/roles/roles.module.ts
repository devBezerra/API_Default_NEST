import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { ProfileEntity } from './entities/profile.entity';
import { CheckRole } from 'src/shared/utils/check-role.util';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, ProfileEntity])],
  controllers: [RolesController],
  providers: [RolesService, CheckRole],
})
export class RolesModule {}
