// src/lib/Services/UserService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { IUser } from '@/lib/interfaces/IUser';

class UserService {
  /**
   * Fetch user data.
   * @returns IUser
   */
  async getUser(): Promise<IUser> {
    const response = await ApiService.get<{ data: IUser }>(API_PATHS.USER.GET_USER);
    return response.data;
  }

  /**
   * Update user data.
   * @param userId 
   * @param data 
   * @returns IUser
   */
  async updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    const response = await ApiService.put<{ data: IUser }>(API_PATHS.USER.UPDATE_USER(userId), data);
    return response.data;
  }

  /**
   * Delete user.
   * @param userId 
   */
  async deleteUser(userId: string): Promise<void> {
    await ApiService.delete<void>(API_PATHS.USER.DELETE_USER(userId));
  }
}

export default new UserService();
