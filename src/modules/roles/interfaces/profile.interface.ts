import { RoleInterface } from "./role.interface";

export interface ProfileInterface {
    id: number;
    userId: number;
    roleId: number;
    role?: RoleInterface;
}