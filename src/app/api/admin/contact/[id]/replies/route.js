import STATUS_CODES from '@/shared/constants/status';
import { createErrorResponse, handleApiError } from '@/server/http';
import { verifyAuth } from '@/features/auth/server';
import { REPLY_SELECT, canEmailContact, deliverReply, findContactForReply, findReplySender, readReplyBody } from '@/features/inbox/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { NextResponse } from 'next/server';

/** GET - all replies for a contact, newest first */
export async function GET( req, { params } ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}
  try {
    const { id } = await params;
    const replies = await prismadb.contactReply.findMany( {
      where: { contactId: id },
      orderBy: { createdAt: 'desc' },
      select: REPLY_SELECT
    } );
    return NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Replies retrieved successfully', replies ), { status: STATUS_CODES.SUCCESS } );
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
    const body = await readReplyBody( req, { sendEmailByDefault: true } );
    if ( !body ) {return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Reply message is required' );}

    const contact = await findContactForReply( id );
    if ( !contact ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );}
    if ( !canEmailContact( contact ) ) {return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid contact email' );}

    const sender = await findReplySender();
    if ( !sender ) {return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );}

    const { id: replyId } = await prismadb.contactReply.create( {
      data: { contactId: id, message: body.message, emailSent: false, sentAt: null },
      select: { id: true }
    } );
    const delivery = body.sendEmail
      ? await deliverReply( { contact, replyId, message: body.message, sender } )
      : { emailSent: false, emailError: null };

    await prismadb.contact.update( { where: { id }, data: { status: 'replied' } } );
    const reply = await prismadb.contactReply.findUnique( { where: { id: replyId }, select: REPLY_SELECT } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Reply created successfully', { reply, ...delivery } ),
      { status: STATUS_CODES.SUCCESS }
    );
  } catch ( error ) {
    return handleApiError( error, 'Create contact reply' );
  }
}
