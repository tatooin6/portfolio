import { formatSubmissionTime } from '@/utils/dateUtils';

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_KEY);

interface emailFormat {
  name: string;
  message: string;
  email: string;
}

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'Hello from the portfolio API!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    const mailData = {
      from: `Portfolio: ${name} <onboarding@resend.dev>`,
      to: 'tato_fos@hotmail.com',
      subject: `Contact Submission from ${email}`,
      reply_to: email,
      text: `${formatSubmissionTime()}\n ${message}`,
    }
    const response = await resend.emails.send(mailData);
    return NextResponse.json({ message: 'Enviado correctamente', response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error while trying to send the message.' }, { status: 500 });
  }
}

