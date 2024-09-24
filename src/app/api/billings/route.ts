// src/app/api/billings/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Billing from '@/lib/models/Billing';
import { authorize } from '@/lib/middleware/auth';
import { plainToInstance } from 'class-transformer';
import { IBilling } from '@/lib/interfaces/IBilling';
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
    const billing = await Billing.findOne({ orgId: authResponse.user.orgId, deleted: false });

    if (!billing) {
      return NextResponse.json(
        prepareError('billing_not_found'),
        { status: 404 }
      );
    }

    return NextResponse.json({ data: billing }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching billing:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  const data: Partial<IBilling> = await request.json();

  // Validate input
  const billingInstance = plainToInstance(Billing, data);
  const errors = await validateModel(billingInstance);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Invalid billing data.', details: errors } },
      { status: 400 }
    );
  }

  try {
    const billing = await Billing.findOneAndUpdate(
      { orgId: authResponse.user.orgId, deleted: false },
      data,
      { new: true, runValidators: true }
    );

    if (!billing) {
      return NextResponse.json(
        prepareError('billing_not_found'),
        { status: 404 }
      );
    }

    return NextResponse.json({ data: billing }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating billing:', error);
    return NextResponse.json(
      prepareError('internal_error'),
      { status: 500 }
    );
  }
}
