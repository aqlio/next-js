// src/interfaces/IOrganization.ts
import { IBilling } from './IBilling';

export interface IOrganization {
  id: string;
  api_rate_limit_per_sec?: number;
  rateLimit?: Record<string, any>; // Adjust type as needed
  unpaid: boolean;
  plans?: Record<string, any>; // Adjust type as needed
  billing: IBilling;
  deleted: boolean;
  deletedAt?: string; // ISO string
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}
