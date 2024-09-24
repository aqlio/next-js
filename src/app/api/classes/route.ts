// src/app/api/classes/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Class from '@/lib/models/Class';
import User from '@/lib/models/User';
import { prepareError } from '@/lib/utils/ErrorHandler';
import { authorize } from '@/lib/middleware/auth';
import { IClass } from '@/lib/interfaces/IClass';
import { prepareClassData } from '@/lib/utils/class';

export async function POST(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { name, description, teacher_id, class_code } = await request.json();

  // Input Validation
  if (!name || !teacher_id || !class_code) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Name, teacher_id, and class_code are required.' } },
      { status: 400 }
    );
  }

  try {
    // Check if class_code already exists
    const existingClass = await Class.findOne({ classCode: class_code, orgId: authResponse.user.orgId });

    if (existingClass) {
      return NextResponse.json(
        { error: { code: 'class_code_already_exists', message: 'Class code already exists.' } },
        { status: 400 }
      );
    }

    // Verify Teacher Exists
    const teacher = await User.findById(teacher_id);

    if (!teacher || !teacher.roles.includes('teacher')) {
      return NextResponse.json(
        { error: { code: 'invalid_teacher', message: 'Invalid teacher_id.' } },
        { status: 400 }
      );
    }

    // Create New Class
    const newClass: IClass = {
      title: name,
      description,
      classCode: class_code,
      orgId: authResponse.user.orgId,
      teacherId: teacher_id,
      time: new Date(),
      durationInSeconds: 3600, // Example duration
      tests: [],
      deleted: false,
    };

    const classDoc = new Class(newClass);
    await classDoc.save();

    const preparedData = await prepareClassData(classDoc);

    return NextResponse.json(preparedData, { status: 201 });
  } catch (error: any) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  try {
    const classes = await Class.find({ orgId: authResponse.user.orgId, deleted: false }).populate('teacherId');

    const preparedClassesData = await Promise.all(classes.map(prepareClassData));

    return NextResponse.json({ data: preparedClassesData }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}
