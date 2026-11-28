import { verifyAuth } from '@/features/auth/server';
import { generateReplyDraft } from '@/features/inbox/server';
import { DataResponse, HttpError, handleApiError, successResponse } from '@/server/http';
import { consumeRateLimit } from '@/server/security';
import STATUS_CODES from '@/shared/constants/status';
import { NextResponse } from 'next/server';

const DRAFT_RATE_LIMIT = { limit: 12, windowMs: 15 * 60 * 1000 };

export async function POST( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}

  const rateLimit = consumeRateLimit( `admin-ai-reply:${authResult.decoded.id}`, DRAFT_RATE_LIMIT );
  if ( !rateLimit.allowed ) {
    const retryAfter = Math.max( 1, Math.ceil( ( rateLimit.resetAt - Date.now() ) / 1000 ) );
    return NextResponse.json(
      DataResponse( 429, 'AI draft limit reached. Try again in a few minutes.', null ),
      { status: 429, headers: { 'Retry-After': String( retryAfter ) } }
    );
  }

  try {
    const { id } = await params;
    const body = await req.json().catch( () => ( {} ) );
    return successResponse( 'Draft generated for review', await generateReplyDraft( id, body ) );
  } catch ( error ) {
    return handleApiError( error, 'Generate reply draft', new HttpError( STATUS_CODES.SERVICE_UNAVAILABLE, 'Unable to generate an AI draft.' ) );
  }
}
