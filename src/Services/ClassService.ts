// src/lib/services/ClassService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { IClass } from "@/interfaces/IClass";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Class } from "@/models/Class";

class ClassService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.CLASS.GET_CLASSES, // Adjust the API path accordingly
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch all classes with optional filters.
   * @param token 
   * @param params 
   * @returns IClass[]
   */
  async getClasses(token: string, params?: Record<string, any>): Promise<IClass[]> {
    const response = await this.axiosInstance.get<IClass[]>(API_PATHS.CLASS.GET_CLASSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data.map(cls => plainToInstance(Class, cls, { excludeExtraneousValues: true }));
  }

  /**
   * Create a new class.
   * @param token 
   * @param data 
   * @returns IClass
   */
  async createClass(token: string, data: Partial<IClass>): Promise<IClass> {
    const response = await this.axiosInstance.post<IClass>(API_PATHS.CLASS.CREATE_CLASS, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Class, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update a class.
   * @param token 
   * @param classId 
   * @param data 
   * @returns IClass
   */
  async updateClass(token: string, classId: string, data: Partial<IClass>): Promise<IClass> {
    const response = await this.axiosInstance.put<IClass>(`${API_PATHS.CLASS.UPDATE_CLASS}/${classId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Class, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Delete a class.
   * @param token 
   * @param classId 
   */
  async deleteClass(token: string, classId: string): Promise<void> {
    await this.axiosInstance.delete(`${API_PATHS.CLASS.DELETE_CLASS}/${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ClassService;
