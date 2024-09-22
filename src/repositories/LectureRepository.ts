// src/repositories/LectureRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Lecture } from "@/models/Lecture";
import { ILecture } from "@/interfaces/ILecture";

export class LectureRepository extends BaseRepository<ILecture> {
  protected apiEndpoint = "/lectures";
  protected modelClass = Lecture;

  // Add any Lecture-specific methods here if needed
}
