// src/app/api/classes/[class_id]/student/[student_id]/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Class from '@/lib/models/Class';
import User from '@/lib/models/User';
import Student from '@/lib/models/Student';
import ClassEnrollment from '@/lib/models/ClassEnrollment';
import { prepareError } from '@/lib/utils/ErrorHandler';
import { authorize } from '@/lib/middleware/auth';
import { prepareEnrollmentData } from '@/lib/utils/classEnrollment';

export async function POST(request: NextRequest, { params }: { params: { class_id: string; student_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { class_id, student_id } = params;

  try {
    // Verify Class Exists
    const classDoc = await Class.findOne({ _id: class_id, orgId: authResponse.user.orgId, deleted: false });
    if (!classDoc) {
      return NextResponse.json(
        { error: { code: 'class_not_found', message: 'Class not found.' } },
        { status: 404 }
      );
    }

    // Verify Student Exists
    const student = await Student.findOne({ _id: student_id, orgId: authResponse.user.orgId, deleted: false });
    if (!student) {
      return NextResponse.json(
        { error: { code: 'student_not_found', message: 'Student not found.' } },
        { status: 404 }
      );
    }

    // Check if Enrollment Already Exists
    const existingEnrollment = await ClassEnrollment.findOne({ classId: class_id, studentId: student_id, deleted: false });
    if (existingEnrollment) {
      return NextResponse.json(
        await prepareEnrollmentData(existingEnrollment),
        { status: 200 }
      );
    }

    // Create Enrollment
    const enrollment = new ClassEnrollment({
      classId: class_id,
      studentId: student_id,
      orgId: authResponse.user.orgId,
      createdBy: authResponse.user._id,
    });

    await enrollment.save();

    const preparedEnrollment = await prepareEnrollmentData(enrollment);

    return NextResponse.json(preparedEnrollment, { status: 201 });
  } catch (error: any) {
    console.error('Error enrolling student:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { class_id: string; student_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { class_id, student_id } = params;

  try {
    // Find Enrollment
    const enrollment = await ClassEnrollment.findOne({ classId: class_id, studentId: student_id, deleted: false });
    if (!enrollment) {
      return NextResponse.json(
        { error: { code: 'enrollment_not_found', message: 'Enrollment not found.' } },
        { status: 404 }
      );
    }

    // Mark as Deleted
    enrollment.deleted = true;
    enrollment.deletedBy = authResponse.user._id;
    await enrollment.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error unenrolling student:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}
