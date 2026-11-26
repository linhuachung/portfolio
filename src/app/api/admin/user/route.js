import { verifyAuth } from '@/features/auth/server';
import { getAdminProfile, updateAdminProfile } from '@/features/profile/server';
import { HttpError, handleApiError, successResponse } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';

/** GET - owner profile for the admin editor */
export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    return successResponse( 'User profile retrieved', await getAdminProfile() );
  } catch ( error ) {
    return handleApiError( error, 'Get user profile' );
  }
}

/** PUT - update the owner profile and replace its social links */
export async function PUT( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const body = await req.json().catch( () => null );
    if ( !body || typeof body !== 'object' ) {throw new HttpError( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );}
    return successResponse( 'User profile updated successfully', await updateAdminProfile( body ) );
  } catch ( error ) {
    return handleApiError( error, 'Update user profile' );
  }
}
