// src/models/Billing.ts
import { Expose } from 'class-transformer';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { IBilling } from '../interfaces/IBilling';
import { BaseModel } from './BaseModel';

export class Billing extends BaseModel implements IBilling {
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  address!: string;

  @Expose()
  @IsString()
  address_line!: string;

  @Expose()
  @IsString()
  city!: string;

  @Expose()
  @IsString()
  state_code!: string;

  @Expose()
  @IsString()
  country_code!: string;

  @Expose()
  @IsString()
  postal!: string;

  @Expose()
  @IsString()
  currency!: string;

  @Expose()
  @IsString()
  gst_number!: string;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  emails!: string[];

  constructor(partial: Partial<Billing>) {
    super(partial);
  }
}
