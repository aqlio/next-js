// src/lib/services/StudentService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { IStudent } from "@/interfaces/IStudent";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Student } from "@/models/Student";

class StudentService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.STUDENT.GET_STUDENT, // Adjust the API path accordingly
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch all students with optional filters.
   * @param token 
   * @param params 
   * @returns IStudent[]
   */
  async getStudents(token: string, params?: Record<string, any>): Promise<IStudent[]> {
    const response = await this.axiosInstance.get<IStudent[]>(API_PATHS.STUDENT.GET_STUDENT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data.map(student => plainToInstance(Student, student, { excludeExtraneousValues: true }));
  }

  /**
   * Create a new student.
   * @param token 
   * @param data 
   * @returns IStudent
   */
  async createStudent(token: string, data: Partial<IStudent>): Promise<IStudent> {
    const response = await this.axiosInstance.post<IStudent>(API_PATHS.STUDENT.GET_STUDENT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Student, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update a student.
   * @param token 
   * @param studentId 
   * @param data 
   * @returns IStudent
   */
  async updateStudent(token: string, studentId: string, data: Partial<IStudent>): Promise<IStudent> {
    const response = await this.axiosInstance.put<IStudent>(`${API_PATHS.STUDENT.GET_STUDENT}/${studentId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Student, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Delete a student.
   * @param token 
   * @param studentId 
   */
  async deleteStudent(token: string, studentId: string): Promise<void> {
    await this.axiosInstance.delete(`${API_PATHS.STUDENT.GET_STUDENT}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default StudentService;
