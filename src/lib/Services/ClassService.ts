// src/lib/Services/ClassService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { IClass } from '@/lib/interfaces/IClass';

class ClassService {
  /**
   * Fetch all classes.
   * @returns IClass[]
   */
  async getClasses(): Promise<IClass[]> {
    const response = await ApiService.get<{ data: IClass[] }>(API_PATHS.CLASS.GET_CLASSES);
    return response.data;
  }

  /**
   * Create a new class.
   * @param data 
   * @returns IClass
   */
  async createClass(data: Partial<IClass>): Promise<IClass> {
    const response = await ApiService.post<{ data: IClass }>(API_PATHS.CLASS.CREATE_CLASS, data);
    return response.data;
  }

  /**
   * Update a class.
   * @param classId 
   * @param data 
   * @returns IClass
   */
  async updateClass(classId: string, data: Partial<IClass>): Promise<IClass> {
    const response = await ApiService.put<{ data: IClass }>(API_PATHS.CLASS.UPDATE_CLASS(classId), data);
    return response.data;
  }

  /**
   * Delete a class.
   * @param classId 
   */
  async deleteClass(classId: string): Promise<void> {
    await ApiService.delete<void>(API_PATHS.CLASS.DELETE_CLASS(classId));
  }
}

export default new ClassService();
