import BaseApiService from './BaseApiService';
import { API_PATHS } from '@/constants/apiConstants';
import { IClass } from '@/lib/interfaces/Class/IClass';

export default class ClassService extends BaseApiService {
  async getClasses(token: string): Promise<IClass[]> {
    try {
      this.setAuthToken(token);
      const response = await this.api.get<IClass[]>(API_PATHS.CLASS.GET_CLASSES);
      return response.data;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  }

  async createClass(token: string, classData: Omit<IClass, 'id'>): Promise<IClass> {
    try {
      this.setAuthToken(token);
      const response = await this.api.post<IClass>(API_PATHS.CLASS.CREATE_CLASS, classData);
      return response.data;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }

  async updateClass(token: string, classId: string, classData: Partial<IClass>): Promise<IClass> {
    try {
      this.setAuthToken(token);
      const response = await this.api.put<IClass>(`${API_PATHS.CLASS.UPDATE_CLASS}/${classId}`, classData);
      return response.data;
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  }

  async deleteClass(token: string, classId: string): Promise<void> {
    try {
      this.setAuthToken(token);
      await this.api.delete(`${API_PATHS.CLASS.DELETE_CLASS}/${classId}`);
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  }
}