// src/app/api/students/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Student from '@/lib/models/Student';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { IStudent } from '@/lib/interfaces/IStudent';
import { validateModel } from '@/lib/utils/Validators';
import { prepareError } from '@/lib/utils/errorHandler';
import { sendWelcomeEmail } from '@/lib/utils/mail';

export async function GET(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  try {
    const students = await Student.find({ orgId: authResponse.user.orgId, deleted: false });

    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

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
    // Check if student email already exists
    const existingStudent = await Student.findOne({ email: data.email, orgId: authResponse.user.orgId, deleted: false });
    if (existingStudent) {
      return NextResponse.json(
        { error: { code: 'invalid_input', message: 'Student with this email already exists.' } },
        { status: 400 }
      );
    }

    const student = new Student({
      ...data,
      orgId: authResponse.user.orgId,
      deleted: false,
    });

    await student.save();

    // Send Welcome Email
    if (data.email) {
      await sendWelcomeEmail(data.email);
    }

    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
