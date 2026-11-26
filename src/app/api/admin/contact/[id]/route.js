import { verifyAuth } from '@/features/auth/server';
import { getContactDetail, updateContact } from '@/features/inbox/server';
import { handleApiError, successResponse } from '@/server/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET - one contact with its replies */
export async function GET( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id } = await params;
    return successResponse( 'Contact retrieved successfully', await getContactDetail( id ) );
  } catch ( error ) {
    return handleApiError( error, 'Get contact detail' );
  }
}

/** PUT - update status and/or the legacy single reply field */
export async function PUT( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id } = await params;
    const body = await req.json().catch( () => null );
    return successResponse( 'Contact updated successfully', await updateContact( id, body ) );
  } catch ( error ) {
    return handleApiError( error, 'Update contact' );
  }
}
