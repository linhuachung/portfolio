import prismadb from '@/server/db';
import { EMAIL_DEFAULTS, isValidEmailFormat } from '@/server/email';
import { HttpError } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';
import { sendReplyEmail } from './reply-email';

export const REPLY_SELECT = {
  id: true,
  message: true,
  emailSent: true,
  sentAt: true,
  createdAt: true,
  updatedAt: true
};

const NO_DELIVERY = { emailSent: false, emailError: null };

const findContactForReply = ( contactId ) => prismadb.contact.findUnique( {
  where: { id: contactId },
  select: { id: true, firstname: true, lastname: true, name: true, email: true, message: true }
} );

async function requireContact( contactId ) {
  const contact = await findContactForReply( contactId );
  if ( !contact ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Contact not found' );}
  return contact;
}

async function requireOwnReply( contactId, replyId ) {
  const reply = await prismadb.contactReply.findUnique( { where: { id: replyId }, select: { contactId: true } } );
  if ( reply?.contactId !== contactId ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Reply not found' );}
}

// The portfolio owner who signs reply emails.
const findReplySender = () => prismadb.user.findFirst( { select: { email: true, name: true } } );

const canEmailContact = ( contact ) => Boolean( contact.email ) && isValidEmailFormat( contact.email );

const findReply = ( replyId ) => prismadb.contactReply.findUnique( { where: { id: replyId }, select: REPLY_SELECT } );

/** Validates `{ message, sendEmail }` from a request body. */
function parseReplyBody( body, { sendEmailByDefault } ) {
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if ( !message ) {throw new HttpError( STATUS_CODES.BAD_REQUEST, 'Reply message is required' );}
  return { message, sendEmail: body.sendEmail ?? sendEmailByDefault };
}

/**
 * Emails `replyId` to the contact with the earlier replies as history and records
 * the delivery. Failures are reported, not thrown, because the reply is saved.
 */
async function deliverReply( { contact, replyId, message, sender } ) {
  if ( !canEmailContact( contact ) ) {return { emailSent: false, emailError: 'Invalid contact email' };}
  if ( !sender ) {return { emailSent: false, emailError: 'Portfolio owner is not configured' };}

  const previousReplies = await prismadb.contactReply.findMany( {
    where: { contactId: contact.id, id: { not: replyId } },
    orderBy: { createdAt: 'asc' },
    select: { id: true, message: true, createdAt: true }
  } );

  try {
    await sendReplyEmail( {
      contactId: contact.id,
      replyId,
      recipientEmail: contact.email,
      recipientName: contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim(),
      replyMessage: message,
      originalMessage: contact.message,
      previousReplies,
      adminName: sender.name || EMAIL_DEFAULTS.ADMIN_NAME,
      adminEmail: sender.email
    } );
  } catch ( error ) {
    console.error( 'Failed to send reply email:', error );
    return { emailSent: false, emailError: 'Email delivery failed' };
  }

  await prismadb.contactReply.update( { where: { id: replyId }, data: { emailSent: true, sentAt: new Date() } } );
  return { emailSent: true, emailError: null };
}

export const listReplies = ( contactId ) => prismadb.contactReply.findMany( {
  where: { contactId },
  orderBy: { createdAt: 'desc' },
  select: REPLY_SELECT
} );

/**
 * Saves a reply, emails it unless `sendEmail` is false, and marks the contact
 * replied. Refuses up front when the reply could not be emailed at all.
 * @returns {Promise<{ reply: object, emailSent: boolean, emailError: string | null }>}
 */
export async function createReply( contactId, body ) {
  const { message, sendEmail } = parseReplyBody( body, { sendEmailByDefault: true } );
  const contact = await requireContact( contactId );
  if ( !canEmailContact( contact ) ) {throw new HttpError( STATUS_CODES.BAD_REQUEST, 'Invalid contact email' );}
  const sender = await findReplySender();
  if ( !sender ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'User not found' );}

  const { id: replyId } = await prismadb.contactReply.create( {
    data: { contactId, message, emailSent: false, sentAt: null },
    select: { id: true }
  } );
  const delivery = sendEmail ? await deliverReply( { contact, replyId, message, sender } ) : NO_DELIVERY;
  await prismadb.contact.update( { where: { id: contactId }, data: { status: 'replied' } } );

  return { reply: await findReply( replyId ), ...delivery };
}

/** Edits a reply and, when `sendEmail` is true, emails the new text. */
export async function updateReply( contactId, replyId, body ) {
  const { message, sendEmail } = parseReplyBody( body, { sendEmailByDefault: false } );
  await requireOwnReply( contactId, replyId );
  const contact = await requireContact( contactId );

  await prismadb.contactReply.update( { where: { id: replyId }, data: { message } } );
  const delivery = sendEmail ? await deliverReply( { contact, replyId, message, sender: await findReplySender() } ) : NO_DELIVERY;

  return { reply: await findReply( replyId ), ...delivery };
}

export async function deleteReply( contactId, replyId ) {
  await requireOwnReply( contactId, replyId );
  await prismadb.contactReply.delete( { where: { id: replyId } } );
}
