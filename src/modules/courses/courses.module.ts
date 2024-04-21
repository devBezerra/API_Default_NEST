import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CourseEntity } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseIdExistPipe } from './pipes/course-id-exists.pipe';
import { CourseDescriptionAlreadyExists } from './validate/course-name-already-exists.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, CourseEntity, CourseIdExistPipe, CourseDescriptionAlreadyExists],
  exports:[CourseDescriptionAlreadyExists]
})
export class CoursesModule {}
