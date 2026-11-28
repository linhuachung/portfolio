import { verifyAuth } from '@/features/auth/server';
import { listContacts, parseAdminContactQuery } from '@/features/inbox/server';
import { HttpError, handleApiError, successResponse } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const filters = parseAdminContactQuery( new URL( req.url ).searchParams );
    return successResponse( 'Contacts retrieved', await listContacts( filters ) );
  } catch ( error ) {
    return handleApiError( error, 'List contacts', new HttpError( STATUS_CODES.SERVER_ERROR, 'Unable to retrieve contacts' ) );
  }
}
