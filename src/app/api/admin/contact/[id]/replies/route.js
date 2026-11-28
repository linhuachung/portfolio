import { verifyAuth } from '@/features/auth/server';
import { createReply, listReplies } from '@/features/inbox/server';
import { handleApiError, successResponse } from '@/server/http';

/** GET - all replies for a contact, newest first */
export async function GET( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id } = await params;
    return successResponse( 'Replies retrieved successfully', await listReplies( id ) );
  } catch ( error ) {
    return handleApiError( error, 'Get contact replies' );
  }
}

/** POST - create a reply, email it unless `sendEmail` is false, and mark the contact replied */
export async function POST( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id } = await params;
    const body = await req.json().catch( () => null );
    return successResponse( 'Reply created successfully', await createReply( id, body ) );
  } catch ( error ) {
    return handleApiError( error, 'Create contact reply' );
  }
}
