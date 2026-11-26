import STATUS_CODES from '@/shared/constants/status';
import { createErrorResponse, handleApiError } from '@/server/http';
import { validateContactPayload } from '@/features/contact/utils/contact-validation';
import { prepareContactData } from '@/features/contact/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { sendContactEmail } from '@/features/contact/server';
import { NextResponse } from 'next/server';
import { consumeRateLimit, getClientKey } from '@/server/security';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST( req ) {
  const rateLimit = consumeRateLimit( getClientKey( req, 'contact' ), { limit: 5, windowMs: 15 * 60 * 1000 } );
  if ( !rateLimit.allowed ) {
    return NextResponse.json( { status: 429, message: 'Too many messages. Please try again later.' }, { status: 429 } );
  }

  try {
    const body = await req.json().catch( () => null );
    if ( !body || typeof body !== 'object' ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );
    }

    const validation = validateContactPayload( body );
    if ( !validation.valid ) {
      return NextResponse.json( {
        status: STATUS_CODES.BAD_REQUEST,
        message: 'Validation failed',
        errors: Object.entries( validation.errors ).map( ( [field, message] ) => ( { field, message } ) )
      }, { status: STATUS_CODES.BAD_REQUEST } );
    }

    const user = await prismadb.user.findFirst( { select: { id: true, email: true } } );
    if ( !user ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact recipient is unavailable' );}

    const payload = { ...body, ...validation.data };
    const contact = await prismadb.contact.create( { data: prepareContactData( payload, user.id ) } );
    let emailSent = false;

    try {
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || user.email;
      if ( recipientEmail ) {
        await sendContactEmail( payload, recipientEmail, contact.id );
        emailSent = true;
      }
    } catch ( emailError ) {
      console.error( 'Contact email notification failed', { name: emailError.name } );
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Contact form submitted successfully', { id: contact.id, emailSent } ),
      { status: STATUS_CODES.SUCCESS }
    );
  } catch ( error ) {
    return handleApiError( error, 'Submit contact form' );
  }
}
