import { CourseInterface } from "src/modules/courses/interfaces/course.interface";

export interface ClasseInterface {
    id: number;
    title: string;
    courseId: number;
    course?: CourseInterface;
}