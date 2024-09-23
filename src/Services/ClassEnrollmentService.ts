// src/lib/services/ClassEnrollmentService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { IClassEnrollment } from "@/interfaces/IClassEnrollment";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { ClassEnrollment } from "@/models/ClassEnrollment";

class ClassEnrollmentService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.CLASS.ENROLLMENTS, // Adjust the API path accordingly
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch all class enrollments with optional filters.
   * @param token 
   * @param params 
   * @returns IClassEnrollment[]
   */
  async getEnrollments(token: string, params?: Record<string, any>): Promise<IClassEnrollment[]> {
    const response = await this.axiosInstance.get<IClassEnrollment[]>(API_PATHS.CLASS.ENROLLMENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data.map(enrollment => plainToInstance(ClassEnrollment, enrollment, { excludeExtraneousValues: true }));
  }

  /**
   * Create a new class enrollment.
   * @param token 
   * @param data 
   * @returns IClassEnrollment
   */
  async createEnrollment(token: string, data: Partial<IClassEnrollment>): Promise<IClassEnrollment> {
    const response = await this.axiosInstance.post<IClassEnrollment>(API_PATHS.CLASS.ENROLLMENTS, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(ClassEnrollment, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update a class enrollment.
   * @param token 
   * @param enrollmentId 
   * @param data 
   * @returns IClassEnrollment
   */
  async updateEnrollment(token: string, enrollmentId: string, data: Partial<IClassEnrollment>): Promise<IClassEnrollment> {
    const response = await this.axiosInstance.put<IClassEnrollment>(`${API_PATHS.CLASS.ENROLLMENTS}/${enrollmentId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(ClassEnrollment, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Delete a class enrollment.
   * @param token 
   * @param enrollmentId 
   */
  async deleteEnrollment(token: string, enrollmentId: string): Promise<void> {
    await this.axiosInstance.delete(`${API_PATHS.CLASS.ENROLLMENTS}/${enrollmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ClassEnrollmentService;
