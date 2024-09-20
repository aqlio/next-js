// src/models/Organization.ts
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BaseModel } from './BaseModel';
import { IOrganization } from '../interfaces/IOrganization';
import { Billing } from './Billing';

export class Organization extends BaseModel<Organization> implements IOrganization {
  static apiEndpoint = '/organizations';

  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsOptional()
  api_rate_limit_per_sec?: number;

  @Expose()
  @IsOptional()
  rateLimit?: Record<string, any>;

  @Expose()
  @IsBoolean()
  unpaid!: boolean;

  @Expose()
  @IsOptional()
  plans?: Record<string, any>;

  @Expose()
  @ValidateNested()
  @Type(() => Billing)
  billing!: Billing;

  @Expose()
  @IsBoolean()
  deleted!: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  deletedAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  createdAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  updatedAt?: string;

  constructor(partial: Partial<Organization>) {
    super();
    Object.assign(this, partial);
    if (partial.billing) {
      this.billing = new Billing(partial.billing);
    }
  }

  // Additional methods or overrides if necessary
}
