// src/models/Student.ts
import { Expose } from 'class-transformer';
import { IsEmail, IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';
import { BaseModel } from './BaseModel';
import { IStudent } from '../lib/interfaces/IStudent';

export class Student extends BaseModel implements IStudent {
  static apiEndpoint = '/students';

  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsArray()
  roles!: string[];

  @Expose()
  @IsOptional()
  @IsString()
  googleId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  provider?: string;

  @Expose()
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @Expose()
  @IsOptional()
  @IsString()
  displayName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  orgId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  hashedPassword?: string;

  @Expose()
  @IsOptional()
  @IsString()
  salt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  emailConfirmToken?: string;

  @Expose()
  @IsOptional()
  @IsString()
  resetToken?: string;

  @Expose()
  @IsBoolean()
  trackingPermission!: boolean;

  @Expose()
  @IsBoolean()
  emailVerified!: boolean;

  @Expose()
  @IsBoolean()
  deleted!: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  last_login?: string;

  @Expose()
  @IsOptional()
  @IsString()
  last_login_ip?: string;

  @Expose()
  @IsOptional()
  @IsString()
  createdAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  updatedAt?: string;

  constructor(partial?: Partial<Student>) {
    super(partial);
  }

  // Additional methods or overrides if necessary
}
