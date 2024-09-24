// src/app/api/lectures/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Lecture from '@/lib/models/Lecture';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { ILecture } from '@/lib/interfaces/ILecture';
import { validateModel } from '@/lib/utils/Validators';
import { prepareError } from '@/lib/utils/ErrorHandler';

export async function GET(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  try {
    const lectures = await Lecture.find({ orgId: authResponse.user.orgId, deleted: false });

    return NextResponse.json({ data: lectures }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching lectures:', error);
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

  const data: Partial<ILecture> = await request.json();

  // Validate input
  const lectureInstance = plainToInstance(Lecture, data);
  const errors = await validateModel(lectureInstance);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Invalid lecture data.', details: errors } },
      { status: 400 }
    );
  }

  try {
    const lecture = new Lecture({
      ...data,
      orgId: authResponse.user.orgId,
      teacherId: authResponse.user.id,
      deleted: false,
    });

    await lecture.save();

    return NextResponse.json({ data: lecture }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lecture:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
