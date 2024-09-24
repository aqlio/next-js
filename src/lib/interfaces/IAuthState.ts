import { IUserData } from "./IUserData";

export default interface IAuthState {
  user: IUserData | null;
  isLoading: boolean;
  error: string | null;
}
