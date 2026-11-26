import { EMAIL_DEFAULTS } from '@/server/email/email-config';
import { isValidEmailFormat } from '@/server/email/email-utils';
import prismadb from '@/server/db/prisma';
import { sendReplyEmail } from '@/features/inbox/server/reply-email';

export const REPLY_SELECT = {
  id: true,
  message: true,
  emailSent: true,
  sentAt: true,
  createdAt: true,
  updatedAt: true
};

export const findContactForReply = ( contactId ) => prismadb.contact.findUnique( {
  where: { id: contactId },
  select: { id: true, firstname: true, lastname: true, name: true, email: true, message: true }
} );

/** The reply, only when it belongs to `contactId`. */
export async function findContactReply( contactId, replyId ) {
  const reply = await prismadb.contactReply.findUnique( { where: { id: replyId }, select: { id: true, contactId: true } } );
  return reply?.contactId === contactId ? reply : null;
}

/** The portfolio owner who signs reply emails. */
export const findReplySender = () => prismadb.user.findFirst( { select: { email: true, name: true } } );

export const canEmailContact = ( contact ) => Boolean( contact.email ) && isValidEmailFormat( contact.email );

/**
 * Emails `replyId` to the contact with the earlier replies as history and records
 * the delivery. Delivery failures are reported, not thrown, because the reply is
 * already saved.
 */
export async function deliverReply( { contact, replyId, message, sender } ) {
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

/** Reads and validates `{ message, sendEmail }`. Returns null when the message is missing. */
export async function readReplyBody( req, { sendEmailByDefault } ) {
  const body = await req.json().catch( () => null );
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if ( !message ) {return null;}
  return { message, sendEmail: body.sendEmail ?? sendEmailByDefault };
}
