// src/app/api/auth/login/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prepareError } from '@/lib/utils/ErrorHandler';
import { IUser } from '@/lib/interfaces/IUser';

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
    const user = await User.findOne({ email });

    if (user) {
      if (user.provider !== 'local') {
        return NextResponse.json(
          { error: { code: 'invalid_provider', message: 'Invalid provider.' } },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword || '');

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: { code: 'invalid_credentials', message: 'Invalid credentials.' } },
          { status: 400 }
        );
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );

      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true }, { status: 200 });
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
    } else {
      // If user doesn't exist, create a new one (local signup)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        roles: ['owner'],
        provider: 'local',
        hashedPassword,
        emailVerified: false,
        emailConfirmToken: crypto.randomBytes(16).toString('hex'),
      });

      await newUser.save();

      // TODO: Send Email Verification
      // Implement mail sending using your mail utility

      // Generate JWT Token
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, roles: newUser.roles },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );

      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true }, { status: 201 });
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
    }
  } catch (error: any) {
    console.error('Error during login/signup:', error);
    return NextResponse.json(
      { error: { code: 'internal_error', message: 'Internal server error.' } },
      { status: 500 }
    );
  }
}
