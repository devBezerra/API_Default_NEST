import { CourseInterface } from 'src/modules/courses/interfaces/course.interface';

export interface StudentInterface {
  id: number;
  name: string;
  courses?: CourseInterface[];
}
