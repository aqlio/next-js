// src/lib/services/LectureService.ts

import { API_PATHS } from "@/constants/apiConstants";
import { ILecture } from "@/interfaces/ILecture";
import axios, { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Lecture } from "@/models/Lecture";

class LectureService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_PATHS.LECTURE.GET_LECTURES, // Adjust the API path accordingly
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetch all lectures with optional filters.
   * @param token 
   * @param params 
   * @returns ILecture[]
   */
  async getLectures(token: string, params?: Record<string, any>): Promise<ILecture[]> {
    const response = await this.axiosInstance.get<ILecture[]>(API_PATHS.LECTURE.GET_LECTURES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data.map(lecture => plainToInstance(Lecture, lecture, { excludeExtraneousValues: true }));
  }

  /**
   * Create a new lecture.
   * @param token 
   * @param data 
   * @returns ILecture
   */
  async createLecture(token: string, data: Partial<ILecture>): Promise<ILecture> {
    const response = await this.axiosInstance.post<ILecture>(API_PATHS.LECTURE.CREATE_LECTURE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Lecture, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Update a lecture.
   * @param token 
   * @param lectureId 
   * @param data 
   * @returns ILecture
   */
  async updateLecture(token: string, lectureId: string, data: Partial<ILecture>): Promise<ILecture> {
    const response = await this.axiosInstance.put<ILecture>(`${API_PATHS.LECTURE.UPDATE_LECTURE}/${lectureId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return plainToInstance(Lecture, response.data, { excludeExtraneousValues: true });
  }

  /**
   * Delete a lecture.
   * @param token 
   * @param lectureId 
   */
  async deleteLecture(token: string, lectureId: string): Promise<void> {
    await this.axiosInstance.delete(`${API_PATHS.LECTURE.DELETE_LECTURE}/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default LectureService;
