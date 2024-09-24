// src/lib/Services/StudentService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { IStudent } from '@/lib/interfaces/IStudent';

class StudentService {
  /**
   * Fetch all students.
   * @returns IStudent[]
   */
  async getStudents(): Promise<IStudent[]> {
    const response = await ApiService.get<{ data: IStudent[] }>(API_PATHS.STUDENT.GET_STUDENT);
    return response.data;
  }

  /**
   * Create a new student.
   * @param data 
   * @returns IStudent
   */
  async createStudent(data: Partial<IStudent>): Promise<IStudent> {
    const response = await ApiService.post<{ data: IStudent }>(API_PATHS.STUDENT.CREATE_STUDENT, data);
    return response.data;
  }

  /**
   * Update a student.
   * @param studentId 
   * @param data 
   * @returns IStudent
   */
  async updateStudent(studentId: string, data: Partial<IStudent>): Promise<IStudent> {
    const response = await ApiService.put<{ data: IStudent }>(API_PATHS.STUDENT.UPDATE_STUDENT(studentId), data);
    return response.data;
  }

  /**
   * Delete a student.
   * @param studentId 
   */
  async deleteStudent(studentId: string): Promise<void> {
    await ApiService.delete<void>(API_PATHS.STUDENT.DELETE_STUDENT(studentId));
  }

  /**
   * Regenerate password for a student.
   * @param studentId 
   */
  async regeneratePassword(studentId: string): Promise<void> {
    await ApiService.post<void>(API_PATHS.STUDENT.REGENERATE_PASSWORD(studentId));
  }
}

export default new StudentService();
