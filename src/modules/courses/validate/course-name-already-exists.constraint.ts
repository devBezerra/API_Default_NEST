/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { CoursesService } from '../courses.service';
import { CourseInterface } from '../interfaces/course.interface';
let service: CoursesService;

@ValidatorConstraint({ name: 'CourseDescriptionAlreadyExists', async: true })
export class CourseDescriptionAlreadyExists implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CoursesService);
  }

  async validate(description: string, validationArguments: ValidationArguments): Promise<boolean> {
    const course: CourseInterface = Object.assign(validationArguments.object);
    const entity = await service.findByDescription(description, course);
    return !entity;
  }
}
