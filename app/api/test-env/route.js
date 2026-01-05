import { NextResponse } from 'next/server';

/**
 * GET - Test environment variables
 * This endpoint helps debug missing environment variables on Vercel
 * Access: https://your-domain.com/api/test-env
 */
export async function GET() {
  const envCheck = {
    // Check if variables exist (without exposing values)
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
    CONTACT_RECIPIENT_EMAIL: !!process.env.CONTACT_RECIPIENT_EMAIL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: !!process.env.JWT_REFRESH_SECRET,

    // Show safe values (not secrets)
    RESEND_FROM_EMAIL_VALUE: process.env.RESEND_FROM_EMAIL || 'Not Set',
    NEXT_PUBLIC_BASE_URL_VALUE: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set',
    CONTACT_RECIPIENT_EMAIL_VALUE: process.env.CONTACT_RECIPIENT_EMAIL ? 'Set' : 'Not Set',

    // Environment info
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV || 'Not on Vercel',
    VERCEL_URL: process.env.VERCEL_URL || 'Not Set'
  };

  return NextResponse.json( envCheck, { status: 200 } );
}

