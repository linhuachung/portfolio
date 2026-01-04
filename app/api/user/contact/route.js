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
    const user = await prismadb.user.findFirst();

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

    try {
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || user.email;

      if ( recipientEmail ) {
        await sendContactEmail( body, recipientEmail );
        emailSent = true;
      }
    } catch ( emailErr ) {
      console.error( 'Failed to send contact email:', emailErr );
      emailError = emailErr.message;
      // Continue even if email fails - contact is saved in DB
    }

    return NextResponse.json(
      DataResponse(
        STATUS_CODES.SUCCESS,
        'Contact form submitted successfully',
        {
          id: contact.id,
          emailSent,
          ...( emailError && { emailError: 'Email notification failed, but your message was saved' } )
        }
      ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Submit contact form' );
  }
}

