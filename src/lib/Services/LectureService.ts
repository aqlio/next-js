// src/lib/Services/LectureService.ts

import ApiService from './ApiService';
import { API_PATHS } from '@/lib/constants/apiConstants';
import { ILecture } from '@/lib/interfaces/ILecture';

class LectureService {
  /**
   * Fetch all lectures.
   * @returns ILecture[]
   */
  async getLectures(): Promise<ILecture[]> {
    const response = await ApiService.get<{ data: ILecture[] }>(API_PATHS.LECTURE.GET_LECTURES);
    return response.data;
  }

  /**
   * Create a new lecture.
   * @param data 
   * @returns ILecture
   */
  async createLecture(data: Partial<ILecture>): Promise<ILecture> {
    const response = await ApiService.post<{ data: ILecture }>(API_PATHS.LECTURE.CREATE_LECTURE, data);
    return response.data;
  }

  /**
   * Update a lecture.
   * @param lectureId 
   * @param data 
   * @returns ILecture
   */
  async updateLecture(lectureId: string, data: Partial<ILecture>): Promise<ILecture> {
    const response = await ApiService.put<{ data: ILecture }>(API_PATHS.LECTURE.UPDATE_LECTURE(lectureId), data);
    return response.data;
  }

  /**
   * Delete a lecture.
   * @param lectureId 
   */
  async deleteLecture(lectureId: string): Promise<void> {
    await ApiService.delete<void>(API_PATHS.LECTURE.DELETE_LECTURE(lectureId));
  }
}

export default new LectureService();
