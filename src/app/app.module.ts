import { Module } from '@nestjs/common';
import { CoursesModule } from '../modules/courses/courses.module';
import { DatabaseModule } from 'src/providers/database/database.module';
import { StudentsModule } from 'src/modules/students/students.module';

@Module({
  imports: [DatabaseModule, CoursesModule, StudentsModule],
})
export class AppModule {}
