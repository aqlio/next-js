// src/app/api/classes/[class_id]/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Class from '@/lib/models/Class';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { IClass } from '@/lib/interfaces/IClass';
import { validateModel } from '@/lib/utils/Validators';
import { prepareError } from '@/lib/utils/ErrorHandler';

export async function PUT(request: NextRequest, { params }: { params: { class_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { class_id } = params;
  const data: Partial<IClass> = await request.json();

  // Validation
  const classInstance = plainToInstance(Class, data);
  const errors = await validateModel(classInstance);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Invalid class data.', details: errors } },
      { status: 400 }
    );
  }

  try {
    const cls = await Class.findOneAndUpdate(
      { id: class_id, orgId: authResponse.user.orgId, deleted: false },
      data,
      { new: true, runValidators: true }
    );

    if (!cls) {
      return NextResponse.json(
        prepareError('class_not_found'),
        { status: 404 }
      );
    }

    return NextResponse.json({ data: cls }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating class:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { class_id: string } }) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const { class_id } = params;

  try {
    const cls = await Class.findOne({ id: class_id, orgId: authResponse.user.orgId, deleted: false });

    if (!cls) {
      return NextResponse.json(
        prepareError('class_not_found'),
        { status: 404 }
      );
    }

    cls.deleted = true;
    cls.deletedAt = new Date().toISOString();
    await cls.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting class:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
