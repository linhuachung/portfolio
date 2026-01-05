import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { handleApiError, createErrorResponse } from '@/lib/api-error-handler';
import { sendContactEmail } from '@/lib/resend';
import { validationContactSchema } from '@/services/schema';
import { prepareContactData } from '@/lib/contact-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST - Submit contact form
 * Saves contact to database and sends email notification
 */
export async function POST( req ) {
  try {
    const body = await req.json();

    // Validate request body
    if ( !body || typeof body !== 'object' ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );
    }

    // Validate with Yup schema
    try {
      await validationContactSchema.validate( body, { abortEarly: false } );
    } catch ( validationError ) {
      const errors = validationError.inner?.map( err => ( {
        field: err.path,
        message: err.message
      } ) ) || [{ message: validationError.message }];

      return NextResponse.json(
        {
          status: STATUS_CODES.BAD_REQUEST,
          message: 'Validation failed',
          errors
        },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Get first user (portfolio owner) to link contact
    const user = await prismadb.user.findFirst( {
      select: {
        id: true,
        email: true
      }
    } );

    if ( !user ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    // Prepare contact data
    const contactData = prepareContactData( body, user.id );

    // Save to database
    const contact = await prismadb.contact.create( {
      data: contactData
    } );

    // Send email notification (don't fail if email fails)
    let emailSent = false;
    let emailError = null;
    let emailErrorDetails = null;

    try {
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || user.email;

      // Log email sending attempt
      // eslint-disable-next-line no-console
      console.log( '📧 Attempting to send contact email:', {
        recipientEmail,
        hasRecipientEmail: !!recipientEmail,
        contactId: contact.id,
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        hasResendFromEmail: !!process.env.RESEND_FROM_EMAIL,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      } );

      if ( recipientEmail ) {
        await sendContactEmail( body, recipientEmail, contact.id );
        emailSent = true;
        // eslint-disable-next-line no-console
        console.log( '✅ Contact email sent successfully to:', recipientEmail );
      } else {
        emailError = 'Recipient email is not configured';
        console.warn( '⚠️ No recipient email configured' );
      }
    } catch ( emailErr ) {
      // Enhanced error logging
      const errorDetails = {
        message: emailErr.message,
        stack: emailErr.stack,
        name: emailErr.name,
        ...( emailErr.response && { response: emailErr.response } ),
        ...( emailErr.error && { error: emailErr.error } )
      };

      console.error( '❌ Failed to send contact email:', JSON.stringify( errorDetails, null, 2 ) );
      emailError = emailErr.message;
      emailErrorDetails = errorDetails;
      // Continue even if email fails - contact is saved in DB
    }

    return NextResponse.json(
      DataResponse(
        STATUS_CODES.SUCCESS,
        'Contact form submitted successfully',
        {
          id: contact.id,
          emailSent,
          ...( emailError && {
            emailError: 'Email notification failed, but your message was saved',
            emailErrorDetails: process.env.NODE_ENV === 'development' ? emailErrorDetails : emailError
          } )
        }
      ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Submit contact form' );
  }
}

