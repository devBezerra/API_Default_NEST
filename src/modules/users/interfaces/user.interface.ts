import { RoleInterface } from "src/modules/roles/interfaces/role.interface";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  currentRole?: RoleInterface;
}
