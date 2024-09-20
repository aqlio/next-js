// src/interfaces/ILecture.ts
export interface ILecture {
    id: string;
    classId: string;
    orgId?: string;
    teacherId?: string;
    date: string; // ISO string
    attendance: any[]; // Define a specific interface if possible
    createdAt?: string; // ISO string
    updatedAt?: string; // ISO string
  }
  