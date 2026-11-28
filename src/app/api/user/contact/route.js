import { submitContact } from '@/features/contact/server';
import { validateContactPayload } from '@/features/contact/utils/contact-validation';
import { createErrorResponse, handleApiError, successResponse } from '@/server/http';
import { consumeRateLimit, getClientKey } from '@/server/security';
import STATUS_CODES from '@/shared/constants/status';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CONTACT_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

export async function POST( req ) {
  const rateLimit = consumeRateLimit( getClientKey( req, 'contact' ), CONTACT_RATE_LIMIT );
  if ( !rateLimit.allowed ) {
    return NextResponse.json( { status: 429, message: 'Too many messages. Please try again later.' }, { status: 429 } );
  }

  try {
    const body = await req.json().catch( () => null );
    if ( !body || typeof body !== 'object' ) {return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );}

    const validation = validateContactPayload( body );
    if ( !validation.valid ) {
      // The form maps each { field, message } back onto its input.
      return NextResponse.json( {
        status: STATUS_CODES.BAD_REQUEST,
        message: 'Validation failed',
        errors: Object.entries( validation.errors ).map( ( [field, message] ) => ( { field, message } ) )
      }, { status: STATUS_CODES.BAD_REQUEST } );
    }

    const result = await submitContact( { ...body, ...validation.data } );
    return successResponse( 'Contact form submitted successfully', result );
  } catch ( error ) {
    return handleApiError( error, 'Submit contact form' );
  }
}
