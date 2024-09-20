import { ITest } from "./ITest";


export interface IClassEnrollment {
  id: string;
  classId: string;
  orgId: string;
  studentId: string;
  status: "pending" | "enrolled" | "rejected";
  scores: ITest[];
  deleted: boolean;
  createdBy: string;
  deletedAt?: string; // ISO string
  deletedBy?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}
