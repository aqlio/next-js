// src/lib/Services/AuthService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import IUserLoginResponse from '@/lib/interfaces/IUserLoginResponse';

class AuthService {
  /**
   * Login user with email and password.
   * @param email 
   * @param password 
   * @returns token
   */
  async login(email: string, password: string): Promise<IUserLoginResponse> {
    const response = await ApiService.post<IUserLoginResponse>(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });
    return response;
  }

  /**
   * Signup user with email and password.
   * @param email 
   * @param password 
   * @returns token
   */
  async signup(email: string, password: string): Promise<IUserLoginResponse> {
    const response = await ApiService.post<IUserLoginResponse>(API_PATHS.AUTH.SIGNUP, {
      email,
      password,
    });
    return response;
  }
}

export default new AuthService();
