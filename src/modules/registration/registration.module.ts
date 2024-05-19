import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { RegistrationEntity } from './entities/registration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckRole } from 'src/shared/utils/check-role.util';
import { RegistrationIdExistsPipe } from './pipes/registration-id-exists.pipe';
import { RegistrationUserCourseExistsPipe } from './pipes/registration-user-course-exists.pipe';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity, UserEntity])],
  controllers: [RegistrationController],
  providers: [RegistrationService, CheckRole, RegistrationIdExistsPipe, RegistrationUserCourseExistsPipe, UsersService],
})
export class RegistrationModule {}
