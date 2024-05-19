import { ProfileInterface } from "src/modules/roles/interfaces/profile.interface";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  currentProfile?: ProfileInterface;
  profiles?: ProfileInterface[];
}
