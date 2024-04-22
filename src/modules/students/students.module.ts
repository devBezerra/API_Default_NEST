import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { CourseEntity } from '../courses/entities/course.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity, CourseEntity])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentEntity],
})
export class StudentsModule {}
