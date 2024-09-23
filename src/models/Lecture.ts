// src/models/Lecture.ts
import { Expose, Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString, IsArray } from 'class-validator';
import { BaseModel } from './BaseModel';
import { ILecture } from '../interfaces/ILecture';

export class Lecture extends BaseModel implements ILecture {
  static apiEndpoint = '/lectures';

  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  classId!: string;

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
  date!: string;

  @Expose()
  @IsArray()
  attendance!: any[];

  @Expose()
  @IsOptional()
  @IsString()
  createdAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  updatedAt?: string;

  constructor(partial?: Partial<Lecture>) {
    super(partial);
  }

  // Additional methods or overrides if necessary
}
