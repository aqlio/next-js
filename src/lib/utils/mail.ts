// src/lib/utils/mail.ts

import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, text: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}

export async function sendEmailVerificationRequest(email: string, verificationToken: string) {
  const verificationURL = `${process.env.DOMAIN}/api/auth/verifyEmail/${verificationToken}`;
  const subject = 'Email Verification for My Academy';
  const text = `To verify your email, open URL ${verificationURL}`;
  const html = `<b>Welcome to My Academy, please click on </b><a href="${verificationURL}">this</a><b> URL to verify your email address.</b>`;

  await sendMail(email, subject, text, html);
}

export async function sendWelcomeEmail(email: string) {
  const subject = 'Welcome to My Academy';
  const text = 'Welcome to My Academy';
  const html = `<b>Welcome to My Academy!</b>`;

  await sendMail(email, subject, text, html);
}
