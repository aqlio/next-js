// src/repositories/ClassRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Class } from "../models/Class";
import { IClass } from "../interfaces/IClass";

export class ClassRepository extends BaseRepository<IClass> {
  protected apiEndpoint = "/classes";
  protected modelClass = Class;

  // Add any Class-specific methods here if needed
}
