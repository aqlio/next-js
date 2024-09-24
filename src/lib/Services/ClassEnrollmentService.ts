// src/lib/Services/ClassEnrollmentService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { IClassEnrollment } from '@/lib/interfaces/IClassEnrollment';

class ClassEnrollmentService {
  /**
   * Fetch all class enrollments with optional filters.
   * @param classId 
   * @returns IClassEnrollment[]
   */
  async getEnrollments(classId: string): Promise<IClassEnrollment[]> {
    const response = await ApiService.get<{ data: IClassEnrollment[] }>(API_PATHS.CLASS.GET_STUDENTS_IN_CLASS(classId));
    return response.data;
  }

  /**
   * Create a new class enrollment.
   * @param classId 
   * @param studentId 
   * @returns IClassEnrollment
   */
  async createEnrollment(classId: string, studentId: string): Promise<IClassEnrollment> {
    const response = await ApiService.post<{ data: IClassEnrollment }>(API_PATHS.CLASS.ENROLL_STUDENT(classId, studentId));
    return response.data;
  }

  /**
   * Update a class enrollment.
   * @param classId 
   * @param studentId 
   * @param data 
   * @returns IClassEnrollment
   */
  async updateEnrollment(classId: string, studentId: string, data: Partial<IClassEnrollment>): Promise<IClassEnrollment> {
    const response = await ApiService.put<{ data: IClassEnrollment }>(API_PATHS.CLASS.ENROLL_STUDENT(classId, studentId), data);
    return response.data;
  }

  /**
   * Delete a class enrollment.
   * @param classId 
   * @param studentId 
   */
  async deleteEnrollment(classId: string, studentId: string): Promise<void> {
    await ApiService.delete<void>(API_PATHS.CLASS.UNENROLL_STUDENT(classId, studentId));
  }
}

export default new ClassEnrollmentService();
