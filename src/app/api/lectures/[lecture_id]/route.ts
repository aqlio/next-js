// src/app/api/lectures/[lecture_id]/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Lecture from '@/lib/models/Lecture';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { ILecture } from '@/lib/interfaces/ILecture';
import { validateModel } from '@/lib/utils/Validators';
import { prepareError } from '@/lib/utils/ErrorHandler';

export async function PUT(request: NextRequest, { params }: { params: { lecture_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { lecture_id } = params;
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
    const lecture = await Lecture.findOneAndUpdate(
      { id: lecture_id, orgId: authResponse.user.orgId, deleted: false },
      data,
      { new: true, runValidators: true }
    );

    if (!lecture) {
      return NextResponse.json(
        prepareError('lecture_not_found'),
        { status: 404 }
      );
    }

    return NextResponse.json({ data: lecture }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating lecture:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { lecture_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { lecture_id } = params;

  try {
    const lecture = await Lecture.findOne({ id: lecture_id, orgId: authResponse.user.orgId, deleted: false });

    if (!lecture) {
      return NextResponse.json(
        prepareError('lecture_not_found'),
        { status: 404 }
      );
    }

    lecture.deleted = true;
    lecture.deletedAt = new Date().toISOString();
    await lecture.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting lecture:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
