// src/repositories/StudentRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Student } from "../models/Student";

export class StudentRepository extends BaseRepository<Student> {
  protected apiEndpoint = "/students";
  protected modelClass = Student;

  // Add any Student-specific methods here if needed
}
