// src/app/api/students/[student_id]/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Student from '@/lib/models/Student';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { IStudent } from '@/lib/interfaces/IStudent';
import { validateModel } from '@/lib/utils/Validators';
import { prepareError } from '@/lib/utils/ErrorHandler';

export async function PUT(request: NextRequest, { params }: { params: { student_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { student_id } = params;
  const data: Partial<IStudent> = await request.json();

  // Validation
  const studentInstance = plainToInstance(Student, data);
  const errors = await validateModel(studentInstance);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Invalid student data.', details: errors } },
      { status: 400 }
    );
  }

  try {
    const student = await Student.findOneAndUpdate(
      { id: student_id, orgId: authResponse.user.orgId, deleted: false },
      data,
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json(
        prepareError('student_not_found'),
        { status: 404 }
      );
    }

    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { student_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { student_id } = params;

  try {
    const student = await Student.findOne({ id: student_id, orgId: authResponse.user.orgId, deleted: false });

    if (!student) {
      return NextResponse.json(
        prepareError('student_not_found'),
        { status: 404 }
      );
    }

    student.deleted = true;
    student.deletedAt = new Date().toISOString();
    await student.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
