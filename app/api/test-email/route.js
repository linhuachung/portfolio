import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/resend';
import { getResendClient, getResendFromEmail } from '@/lib/resend-client';

/**
 * POST - Test email sending on Vercel
 * This endpoint helps debug email sending issues
 *
 * Body: {
 *   recipientEmail: string (optional, defaults to CONTACT_RECIPIENT_EMAIL)
 * }
 */
export async function POST( req ) {
  try {
    const body = await req.json().catch( () => ( {} ) );
    const recipientEmail = body.recipientEmail || process.env.CONTACT_RECIPIENT_EMAIL;

    // Check environment variables
    const envCheck = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
      NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
      CONTACT_RECIPIENT_EMAIL: !!process.env.CONTACT_RECIPIENT_EMAIL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      NODE_ENV: process.env.NODE_ENV
    };

    if ( !envCheck.RESEND_API_KEY ) {
      return NextResponse.json( {
        success: false,
        error: 'RESEND_API_KEY is not configured',
        envCheck
      }, { status: 500 } );
    }

    if ( !envCheck.RESEND_FROM_EMAIL ) {
      return NextResponse.json( {
        success: false,
        error: 'RESEND_FROM_EMAIL is not configured',
        envCheck
      }, { status: 500 } );
    }

    if ( !recipientEmail ) {
      return NextResponse.json( {
        success: false,
        error: 'Recipient email is required. Provide recipientEmail in body or set CONTACT_RECIPIENT_EMAIL env variable.',
        envCheck
      }, { status: 400 } );
    }

    // Test Resend client initialization
    try {
      getResendClient();
    } catch ( err ) {
      return NextResponse.json( {
        success: false,
        error: `Failed to initialize Resend client: ${err.message}`,
        envCheck
      }, { status: 500 } );
    }

    // Test getting from email
    let fromEmail = null;
    try {
      fromEmail = getResendFromEmail();
    } catch ( err ) {
      return NextResponse.json( {
        success: false,
        error: `Failed to get from email: ${err.message}`,
        envCheck
      }, { status: 500 } );
    }

    // Test sending email with sample data
    const testData = {
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      service: 'fe',
      message: 'This is a test email from Vercel deployment.'
    };

    try {
      const result = await sendContactEmail( testData, recipientEmail, null );

      return NextResponse.json( {
        success: true,
        message: 'Test email sent successfully',
        emailId: result.data?.id,
        to: recipientEmail,
        from: fromEmail,
        envCheck
      }, { status: 200 } );
    } catch ( emailErr ) {
      return NextResponse.json( {
        success: false,
        error: `Failed to send test email: ${emailErr.message}`,
        errorDetails: process.env.NODE_ENV === 'development' ? {
          stack: emailErr.stack,
          name: emailErr.name,
          ...( emailErr.response && { response: emailErr.response } ),
          ...( emailErr.error && { error: emailErr.error } )
        } : emailErr.message,
        envCheck
      }, { status: 500 } );
    }

  } catch ( error ) {
    return NextResponse.json( {
      success: false,
      error: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 } );
  }
}

/**
 * GET - Check email configuration
 */
export async function GET() {
  const envCheck = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
    CONTACT_RECIPIENT_EMAIL: !!process.env.CONTACT_RECIPIENT_EMAIL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    // Safe values (not secrets)
    RESEND_FROM_EMAIL_VALUE: process.env.RESEND_FROM_EMAIL || 'Not Set',
    NEXT_PUBLIC_BASE_URL_VALUE: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set'
  };

  return NextResponse.json( envCheck, { status: 200 } );
}

