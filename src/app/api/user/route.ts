// src/app/api/user/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import { authorize } from '@/lib/middleware/auth';
import { prepareError } from '@/lib/utils/ErrorHandler';

export async function GET(request: NextRequest) {
  await dbConnect();

  // Authorization
  const authResponse = await authorize(request);
  if (!authResponse.isAuthorized) {
    return NextResponse.json(authResponse.error, { status: 403 });
  }

  try {
    const user = await User.findById(authResponse.user._id).select('-hashedPassword -salt');

    if (!user) {
      return NextResponse.json(
        { error: { code: 'user_not_found', message: 'User not found.' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}
