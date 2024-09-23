// src/repositories/BillingRepository.ts

import { BaseRepository } from "./BaseRepository";
import { Billing } from "../models/Billing";

export class BillingRepository extends BaseRepository<Billing> {
  protected apiEndpoint = "/billings";
  protected modelClass = Billing;

  // Add any Billing-specific methods here if needed
}
