import BaseApiService from './BaseApiService';
import { API_PATHS } from '@/constants/apiConstants';
import { IUserData } from '@/lib/interfaces/Auth/IUserData';

export default class UserService extends BaseApiService {
  async getUser(token: string): Promise<IUserData> {
    try {
      this.setAuthToken(token);
      const response = await this.api.get<IUserData>(API_PATHS.USER.GET_USER);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}