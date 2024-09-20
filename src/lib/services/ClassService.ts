// src/lib/services/ClassService.ts
import BaseApiService from './BaseApiService';
import { API_PATHS } from '@/constants/apiConstants';
import { Class } from '@/lib/models/Class';
import { plainToInstance } from 'class-transformer';

export default class ClassService extends BaseApiService {
  async getClasses(token: string): Promise<Class[]> {
    try {
      this.setAuthToken(token);
      const response = await this.api.get<Class[]>(API_PATHS.CLASS.GET_CLASSES);
      return plainToInstance(Class, response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  }

  async createClass(token: string, classData: Omit<Class, 'id'>): Promise<Class> {
    try {
      this.setAuthToken(token);
      const response = await this.api.post<Class>(API_PATHS.CLASS.CREATE_CLASS, classData);
      return plainToInstance(Class, response.data);
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }

  async updateClass(token: string, classId: string, classData: Partial<Class>): Promise<Class> {
    try {
      this.setAuthToken(token);
      const response = await this.api.put<Class>(`${API_PATHS.CLASS.UPDATE_CLASS}/${classId}`, classData);
      return plainToInstance(Class, response.data);
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
