import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { CoursesModule } from '../modules/courses/courses.module';
import { DatabaseModule } from 'src/providers/database/database.module';
import { UsersModule } from 'src/modules/users/users.module';
import { RegistrationModule } from 'src/modules/registration/registration.module';
import { RolesModule } from 'src/modules/roles/roles.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, CoursesModule, UsersModule, RegistrationModule, RolesModule],
})
export class AppModule {}
