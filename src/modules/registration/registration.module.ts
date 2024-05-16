import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { RegistrationEntity } from './entities/registration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckRole } from 'src/shared/utils/check-role.util';
import { RegistrationIdExistsPipe } from './pipes/registration-id-exists.pipe';
import { RegistrationUserCourseExistsPipe } from './pipes/registration-user-course-exists.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  controllers: [RegistrationController],
  providers: [RegistrationService, CheckRole, RegistrationIdExistsPipe, RegistrationUserCourseExistsPipe],
})
export class RegistrationModule {}
