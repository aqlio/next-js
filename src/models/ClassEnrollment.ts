// src/models/ClassEnrollment.ts
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { BaseModel } from './BaseModel';
import { IClassEnrollment } from '../interfaces/IClassEnrollment';
import { Test } from './Test';

export class ClassEnrollment extends BaseModel implements IClassEnrollment {
  static apiEndpoint = '/enrollments';

  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  classId!: string;

  @Expose()
  @IsString()
  orgId!: string;

  @Expose()
  @IsString()
  studentId!: string;

  @Expose()
  @IsEnum(['pending', 'enrolled', 'rejected'])
  status!: 'pending' | 'enrolled' | 'rejected';

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  scores!: Test[];

  @Expose()
  @IsBoolean()
  deleted!: boolean;

  @Expose()
  @IsString()
  createdBy!: string;

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

  constructor(partial?: Partial<ClassEnrollment>) {
    super(partial);
  }

  // Additional methods or overrides if necessary
}
