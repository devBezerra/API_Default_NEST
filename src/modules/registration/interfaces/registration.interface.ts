import { CourseInterface } from "src/modules/courses/interfaces/course.interface";
import { UserInterface } from "src/modules/users/interfaces/user.interface";

export interface RegistrationInterface {
    id: number;
    userId: number;
    courseId: number;
    user?: UserInterface;
    course?: CourseInterface;
}