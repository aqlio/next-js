// src/services/LectureService.ts

import { LectureRepository } from "../repositories/LectureRepository";
import { ILecture } from "../interfaces/ILecture";

export class LectureService {
  private lectureRepository: LectureRepository;

  constructor() {
    this.lectureRepository = new LectureRepository();
  }

  /**
   * Set the authentication token for the repository.
   */
  setAuthToken(token: string) {
    this.lectureRepository.setAuthToken(token);
  }

  /**
   * Remove the authentication token from the repository.
   */
  removeAuthToken() {
    this.lectureRepository.removeAuthToken();
  }

  /**
   * Create a new lecture.
   */
  async createLecture(data: Partial<ILecture>): Promise<ILecture> {
    // Add any business logic or validations here
    return this.lectureRepository.create(data);
  }

  /**
   * Retrieve a lecture by ID.
   */
  async getLectureById(id: string): Promise<ILecture> {
    // Add any business logic before fetching
    return this.lectureRepository.getById(id);
  }

  /**
   * Retrieve all lectures with optional filters.
   */
  async getAllLectures(params?: Record<string, any>): Promise<ILecture[]> {
    // Add any business logic before fetching
    return this.lectureRepository.getAll(params);
  }

  /**
   * Update an existing lecture.
   */
  async updateLecture(lectureEntity: ILecture): Promise<ILecture> {
    // Add any business logic or validations before updating
    return this.lectureRepository.update(lectureEntity);
  }

  /**
   * Delete a lecture by ID.
   */
  async deleteLecture(id: string): Promise<void> {
    // Add any business logic before deleting
    return this.lectureRepository.delete(id);
  }

  // Add more lecture-related business methods as needed
}
