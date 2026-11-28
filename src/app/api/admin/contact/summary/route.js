import { verifyAuth } from '@/features/auth/server';
import { getInboxSummary } from '@/features/inbox/server';
import { HttpError, handleApiError, successResponse } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    return successResponse( 'Inbox summary retrieved', await getInboxSummary() );
  } catch ( error ) {
    return handleApiError( error, 'Inbox summary', new HttpError( STATUS_CODES.SERVICE_UNAVAILABLE, 'Inbox summary is temporarily unavailable' ) );
  }
}
