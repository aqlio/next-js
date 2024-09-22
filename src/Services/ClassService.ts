// src/services/ClassService.ts

import { ClassRepository } from "../repositories/ClassRepository";
import { IClass } from "../interfaces/IClass";

export class ClassService {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  /**
   * Set the authentication token for the repository.
   */
  setAuthToken(token: string) {
    this.classRepository.setAuthToken(token);
  }

  /**
   * Remove the authentication token from the repository.
   */
  removeAuthToken() {
    this.classRepository.removeAuthToken();
  }

  /**
   * Create a new class.
   */
  async createClass(data: Partial<IClass>): Promise<IClass> {
    // Add any business logic or validations here
    return this.classRepository.create(data);
  }

  /**
   * Retrieve a class by ID.
   */
  async getClassById(id: string): Promise<IClass> {
    // Add any business logic before fetching
    return this.classRepository.getById(id);
  }

  /**
   * Retrieve all classes with optional filters.
   */
  async getAllClasses(params?: Record<string, any>): Promise<IClass[]> {
    // Add any business logic before fetching
    return this.classRepository.getAll(params);
  }

  /**
   * Update an existing class.
   */
  async updateClass(classEntity: IClass): Promise<IClass> {
    // Add any business logic or validations before updating
    return this.classRepository.update(classEntity);
  }

  /**
   * Delete a class by ID.
   */
  async deleteClass(id: string): Promise<void> {
    // Add any business logic before deleting
    return this.classRepository.delete(id);
  }

  // Add more class-related business methods as needed
}
