import { DEFAULT_FROM_EMAIL, formatEmailAddress, getServiceLabel } from '@/constants/email';
import { Resend } from 'resend';
import {
  loadContactFormHtmlTemplate,
  loadContactFormTextTemplate,
  renderTemplate
} from './email-templates';

const resend = new Resend( process.env.RESEND_API_KEY );

/**
 * Prepare template data for email rendering
 * @param {Object} data - Contact form data
 * @param {string} serviceLabel - Service label
 * @param {boolean} isHtml - Whether this is for HTML template
 * @returns {Object} Template data object
 */
function prepareTemplateData( data, serviceLabel, isHtml = false ) {
  return {
    FIRSTNAME: data.firstname,
    LASTNAME: data.lastname,
    EMAIL: data.email,
    PHONE: data.phone || '',
    SERVICE: serviceLabel,
    MESSAGE: isHtml ? data.message.replace( /\n/g, '<br>' ) : data.message
  };
}

/**
 * Send contact form email via Resend
 * @param {Object} data - Contact form data
 * @param {string} data.firstname - First name
 * @param {string} data.lastname - Last name
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number
 * @param {string} data.service - Service type
 * @param {string} data.message - Message content
 * @param {string} recipientEmail - Email to receive the contact form
 * @returns {Promise<Object>} - Resend response
 */
export async function sendContactEmail( data, recipientEmail ) {
  if ( !process.env.RESEND_API_KEY ) {
    throw new Error( 'RESEND_API_KEY is not configured' );
  }

  if ( !recipientEmail ) {
    throw new Error( 'Recipient email is required' );
  }

  const serviceLabel = getServiceLabel( data.service );
  const senderName = `${data.firstname} ${data.lastname}`;

  // Load templates
  const htmlTemplate = loadContactFormHtmlTemplate();
  const textTemplate = loadContactFormTextTemplate();

  // Prepare and render templates
  const htmlTemplateData = prepareTemplateData( data, serviceLabel, true );
  const textTemplateData = prepareTemplateData( data, serviceLabel, false );

  const emailHtml = renderTemplate( htmlTemplate, htmlTemplateData );
  const emailText = renderTemplate( textTemplate, textTemplateData ).trim();

  // Format email addresses
  const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const fromAddress = `${senderName} via Portfolio <${fromEmail}>`;
  const replyToAddress = formatEmailAddress( senderName, data.email );

  try {
    const result = await resend.emails.send( {
      from: fromAddress,
      to: recipientEmail,
      replyTo: replyToAddress,
      subject: `New Contact: ${senderName} - ${serviceLabel}`,
      html: emailHtml,
      text: emailText
    } );

    return result;
  } catch ( error ) {
    console.error( 'Resend email error:', error );
    throw new Error( `Failed to send email: ${error.message}` );
  }
}

