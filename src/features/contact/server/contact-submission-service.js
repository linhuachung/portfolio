import prismadb from '@/server/db';
import { HttpError } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';
import { prepareContactData } from './contact-data';
import { sendContactEmail } from './contact-email';

/**
 * Stores a validated contact message and emails the owner. A failed email does
 * not fail the submission: the message is saved and `emailSent` is false.
 * @returns {Promise<{ id: string, emailSent: boolean }>}
 */
export async function submitContact( payload ) {
  const owner = await prismadb.user.findFirst( { select: { id: true, email: true } } );
  if ( !owner ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Contact recipient is unavailable' );}

  const contact = await prismadb.contact.create( { data: prepareContactData( payload, owner.id ) } );
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || owner.email;
  if ( !recipientEmail ) {return { id: contact.id, emailSent: false };}

  try {
    await sendContactEmail( payload, recipientEmail, contact.id );
    return { id: contact.id, emailSent: true };
  } catch ( error ) {
    console.error( 'Contact email notification failed', { name: error.name } );
    return { id: contact.id, emailSent: false };
  }
}
