import { IUserData } from "./IUserData";

export default interface IAuthState {
  user: IUserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
