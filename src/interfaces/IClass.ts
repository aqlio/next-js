// src/interfaces/IClass.ts
import { ITest } from './ITest';

export interface IClass {
  id: string;
  title: string;
  description: string;
  classCode: string;
  orgId?: string;
  teacherId?: string;
  time: string; // ISO string
  durationInSeconds: number;
  tests: ITest[];
  deleted: boolean;
  deletedAt?: string; // ISO string
  deletedBy?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}
