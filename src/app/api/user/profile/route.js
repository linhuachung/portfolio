import { getPublicProfile } from '@/features/profile/server';
import { handleApiError, successResponse } from '@/server/http';

// Queries the database at request time.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET - public owner profile; `?includeContact=true` adds email, phone and address */
export async function GET( req ) {
  try {
    const includeContact = new URL( req.url ).searchParams.get( 'includeContact' ) === 'true';
    return successResponse( 'User profile retrieved', await getPublicProfile( { includeContact } ) );
  } catch ( error ) {
    return handleApiError( error, 'Get public user profile' );
  }
}
