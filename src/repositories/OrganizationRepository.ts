// src/repositories/OrganizationRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Organization } from "../models/Organization";

export class OrganizationRepository extends BaseRepository<Organization> {
  protected apiEndpoint = "/organizations";
  protected modelClass = Organization;

  // Add any Organization-specific methods here if needed
}
