import { verifyAuth } from '@/features/auth/server';
import { deleteReply, updateReply } from '@/features/inbox/server';
import { handleApiError, successResponse } from '@/server/http';

/** PUT - edit a reply and, when `sendEmail` is true, email the new text */
export async function PUT( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id, replyId } = await params;
    const body = await req.json().catch( () => null );
    return successResponse( 'Reply updated successfully', await updateReply( id, replyId, body ) );
  } catch ( error ) {
    return handleApiError( error, 'Update contact reply' );
  }
}

/** DELETE - remove a reply that belongs to the contact */
export async function DELETE( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id, replyId } = await params;
    await deleteReply( id, replyId );
    return successResponse( 'Reply deleted successfully' );
  } catch ( error ) {
    return handleApiError( error, 'Delete contact reply' );
  }
}
