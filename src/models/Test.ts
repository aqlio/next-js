// src/models/Test.ts
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { BaseModel } from './BaseModel';
import { ITest } from '../interfaces/ITest';

export class Test extends BaseModel implements ITest {
  static apiEndpoint = '/tests';

  @Expose()
  @IsOptional()
  @IsString()
  id?: string;

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
  @IsNumber()
  weight!: number;

  @Expose()
  @IsArray()
  marks!: any[];

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

  constructor(partial: Partial<Test>) {
    super(partial);
  }

  // Additional methods or overrides if necessary
}
