// src/repositories/LectureRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Lecture } from "@/models/Lecture";

export class LectureRepository extends BaseRepository<Lecture> {
  protected apiEndpoint = "/lectures";
  protected modelClass = Lecture;

  // Add any Lecture-specific methods here if needed
}
