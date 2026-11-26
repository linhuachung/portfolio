import STATUS_CODES from '@/shared/constants/status';
import { createErrorResponse, handleApiError } from '@/server/http';
import { verifyAuth } from '@/features/auth/server';
import { REPLY_SELECT, deliverReply, findContactForReply, findContactReply, findReplySender, readReplyBody } from '@/features/inbox/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { NextResponse } from 'next/server';

/** PUT - edit a reply and, when `sendEmail` is true, email the new text */
export async function PUT( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id, replyId } = await params;
    const body = await readReplyBody( req, { sendEmailByDefault: false } );
    if ( !body ) {return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Reply message is required' );}

    if ( !( await findContactReply( id, replyId ) ) ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Reply not found' );}
    const contact = await findContactForReply( id );
    if ( !contact ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );}

    await prismadb.contactReply.update( { where: { id: replyId }, data: { message: body.message } } );
    const delivery = body.sendEmail
      ? await deliverReply( { contact, replyId, message: body.message, sender: await findReplySender() } )
      : { emailSent: false, emailError: null };
    const reply = await prismadb.contactReply.findUnique( { where: { id: replyId }, select: REPLY_SELECT } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Reply updated successfully', { reply, ...delivery } ),
      { status: STATUS_CODES.SUCCESS }
    );
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
    if ( !( await findContactReply( id, replyId ) ) ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Reply not found' );}

    await prismadb.contactReply.delete( { where: { id: replyId } } );
    return NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Reply deleted successfully', null ), { status: STATUS_CODES.SUCCESS } );
  } catch ( error ) {
    return handleApiError( error, 'Delete contact reply' );
  }
}
