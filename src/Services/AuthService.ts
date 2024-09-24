// src/lib/services/AuthService.ts

import axios, { AxiosInstance } from "axios";
import { API_PATHS, API_BASE_URL } from "@/constants/apiConstants";
import IUserLoginResponse from "@/interfaces/IUserLoginResponse";

class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
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
      email,
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
