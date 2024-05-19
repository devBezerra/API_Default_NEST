import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CourseEntity } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDescriptionAlreadyExists } from './validate/course-name-already-exists.constraint';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { CheckRole } from 'src/shared/utils/check-role.util';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UserEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, CourseEntity, CourseDescriptionAlreadyExists, UsersService, CheckRole],
})
export class CoursesModule {}
