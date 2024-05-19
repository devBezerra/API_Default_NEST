import { UserInterface } from "src/modules/users/interfaces/user.interface";

export interface CourseInterface {
    id: number;
    description: string;
    syllabus: string;
    userId?: number;
    user?: UserInterface;
}
