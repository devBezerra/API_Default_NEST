import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { ClassEntity } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity, CourseEntity])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
