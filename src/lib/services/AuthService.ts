import BaseApiService from "./BaseApiService";
import { API_PATHS } from '@/constants/apiConstants';
import IAuthApiResponse from "../interfaces/Auth/IAuthApiResponse";
import IUserLoginRequestData from "@/lib/interfaces/Auth/IUserLoginRequestData";

export default class AuthService extends BaseApiService {
  async login(email: string, password: string): Promise<IAuthApiResponse> {
    return this.authRequest(API_PATHS.AUTH.LOGIN, { email, password });
  }

  async signup(email: string, password: string): Promise<IAuthApiResponse> {
    return this.authRequest(API_PATHS.AUTH.SIGNUP, { email, password });
  }
  
  private async authRequest(
    endpoint: string,
    data: IUserLoginRequestData
  ): Promise<IAuthApiResponse> {
    try {
      const response = await this.api.post<IAuthApiResponse>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  }
}
