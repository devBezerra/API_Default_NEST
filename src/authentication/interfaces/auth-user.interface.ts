import { RoleInterface } from "src/modules/roles/interfaces/role.interface";
import { UserInterface } from "src/modules/users/interfaces/user.interface";

export interface AuthUserInterface extends UserInterface {
    roles?: RoleInterface[];
}