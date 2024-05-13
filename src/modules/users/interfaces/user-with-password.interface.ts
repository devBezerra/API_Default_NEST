import { UserInterface } from "./user.interface";

export interface UserWithPasswordsInterface extends UserInterface {
    password?: string;
    confirmPassword?: string;
}