// src/repositories/UserRepository.ts

import { BaseRepository } from "./BaseRepository";
import { User } from "../models/User";

export class UserRepository extends BaseRepository<User> {
  protected apiEndpoint = "/users";
  protected modelClass = User;

  // Add any User-specific methods here if needed
}
