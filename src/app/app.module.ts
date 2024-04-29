import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { CoursesModule } from '../modules/courses/courses.module';
import { DatabaseModule } from 'src/providers/database/database.module';
import { StudentsModule } from 'src/modules/students/students.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, CoursesModule, StudentsModule, UsersModule]
})
export class AppModule {}
