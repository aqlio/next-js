// src/models/Class.ts
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { BaseModel } from './BaseModel';
import { IClass } from '../interfaces/IClass';
import { Test } from './Test';

export class Class extends BaseModel implements IClass {
  static apiEndpoint = '/classes';

  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  title!: string;

  @Expose()
  @IsString()
  description!: string;

  @Expose()
  @IsString()
  classCode!: string;

  @Expose()
  @IsOptional()
  @IsString()
  orgId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  teacherId?: string;

  @Expose()
  @IsDateString()
  time!: string;

  @Expose()
  @IsNumber()
  durationInSeconds!: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  tests!: Test[];

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
  deletedBy?: string;

  @Expose()
  @IsOptional()
  @IsString()
  createdAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  updatedAt?: string;

  constructor(partial?: Partial<Class>) {
    super(partial);
  }

  // Additional methods or overrides if necessary
}
