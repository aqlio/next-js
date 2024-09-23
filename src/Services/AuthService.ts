// src/lib/services/AuthService.ts

import IUserLoginRequestData from "@/interfaces/IUserLoginRequestData";
import IUserLoginResponse from "@/interfaces/IUserLoginResponse";
import { API_PATHS } from "@/constants/apiConstants";
import axios, { AxiosInstance } from "axios";

class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.AUTH.LOGIN, // Assuming login and signup share the same base URL
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Login user with email and password.
   * @param email 
   * @param password 
   * @returns token
   */
  async login(email: string, password: string): Promise<IUserLoginResponse> {
    const response = await this.axiosInstance.post<IUserLoginResponse>(API_PATHS.AUTH.LOGIN, {
      identifier: email,
      password,
    });
    return response.data;
  }

  /**
   * Signup user with email and password.
   * @param email 
   * @param password 
   * @returns token
   */
  async signup(email: string, password: string): Promise<IUserLoginResponse> {
    const response = await this.axiosInstance.post<IUserLoginResponse>(API_PATHS.AUTH.SIGNUP, {
      email,
      password,
    });
    return response.data;
  }
}

export default AuthService;
