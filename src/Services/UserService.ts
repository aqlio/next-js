// src/lib/services/UserService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { IUser } from "@/interfaces/IUser";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { User } from "@/models/User";

class UserService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.USER.GET_USER,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch user data.
   * @param token 
   * @returns IUser
   */
  async getUser(token: string): Promise<IUser> {
    const response = await this.axiosInstance.get<IUser>(API_PATHS.USER.GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(User, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update user data.
   * @param token 
   * @param userId 
   * @param data 
   * @returns IUser
   */
  async updateUser(token: string, userId: string, data: Partial<IUser>): Promise<IUser> {
    const response = await this.axiosInstance.put<IUser>(`${API_PATHS.USER.GET_USER}/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(User, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Delete user.
   * @param token 
   * @param userId 
   */
  async deleteUser(token: string, userId: string): Promise<void> {
    await this.axiosInstance.delete(`${API_PATHS.USER.GET_USER}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default UserService;
