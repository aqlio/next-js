// src/app/api/auth/signup/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmailVerificationRequest } from '@/lib/utils/mail';
import { prepareError } from '@/lib/utils/ErrorHandler';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { email, password } = await request.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: { code: 'invalid_input', message: 'Email and password are required.' } },
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: { code: 'invalid_input', message: 'User already exists.' } },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      roles: ['owner'],
      provider: 'local',
      hashedPassword,
      emailVerified: false,
      emailConfirmToken: crypto.randomBytes(16).toString('hex'),
    });

    await newUser.save();

    // Send email verification
    await sendEmailVerificationRequest(email, newUser.emailConfirmToken || '');

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, roles: newUser.roles },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({ message: 'Signup successful. Please verify your email.' }, { status: 201 });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}
