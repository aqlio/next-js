// src/repositories/ClassRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Class } from "../models/Class";

export class ClassRepository extends BaseRepository<Class> {
  protected apiEndpoint = "/classes";
  protected modelClass = Class;

  // Add any Class-specific methods here if needed
}
