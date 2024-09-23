// src/repositories/TestRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Test } from "../models/Test";

export class TestRepository extends BaseRepository<Test> {
  protected apiEndpoint = "/tests";
  protected modelClass = Test;

  // Add any Test-specific methods here if needed
}
