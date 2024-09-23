// src/repositories/ClassEnrollmentRepository.ts

import { BaseRepository } from "./BaseRepository";
import { ClassEnrollment } from "../models/ClassEnrollment";

export class ClassEnrollmentRepository extends BaseRepository<ClassEnrollment> {
  protected apiEndpoint = "/enrollments";
  protected modelClass = ClassEnrollment;

  // Add any ClassEnrollment-specific methods here if needed
}
