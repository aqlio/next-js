// src/lib/middleware/auth.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoose';
import { prepareError } from '@/lib/utils/ErrorHandler';

interface AuthResponse {
  isAuthorized: boolean;
  user?: any;
  error?: any;
}

export async function authorize(request: NextRequest): Promise<AuthResponse> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuthorized: false, error: { code: 'invalid_token', message: 'Invalid or missing token.' } };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string; roles: string[] };

    await dbConnect();

    const user = await User.findById(decoded.id);

    if (!user || user.deleted) {
      return { isAuthorized: false, error: { code: 'invalid_user', message: 'User not found.' } };
    }

    return { isAuthorized: true, user };
  } catch (error) {
    console.error('Authorization error:', error);
    return { isAuthorized: false, error: { code: 'invalid_token', message: 'Invalid token.' } };
  }
}
