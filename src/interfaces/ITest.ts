// src/interfaces/ITest.ts
export interface ITest {
    id?: string;
    classId: string;
    orgId?: string;
    teacherId?: string;
    weight: number;
    marks: any[]; // Define a specific interface if possible
    attendance: any[]; // Define a specific interface if possible
    createdAt?: string; // ISO string
    updatedAt?: string; // ISO string
  }
  