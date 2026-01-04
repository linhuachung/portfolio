import { formatEmailAddress, getServiceLabel } from '@/constants/email';
import { EMAIL_SUBJECTS, EMAIL_TRACKING } from '@/constants/email-config';
import { formatMessageForHtml, getBaseUrl, isValidObjectId } from '@/lib/email-utils';
import { getResendClient, getResendFromEmail, handleResendResponse } from '@/lib/resend-client';
import {
  loadContactFormHtmlTemplate,
  loadContactFormTextTemplate,
  renderTemplate
} from './email-templates';

/**
 * Prepare template data for email rendering
 * @param {Object} data - Contact form data
 * @param {string} serviceLabel - Service label
 * @param {boolean} isHtml - Whether this is for HTML template
 * @param {string|null} replyUrl - Reply URL for email template
 * @returns {Object} Template data object
 */
function prepareTemplateData( data, serviceLabel, isHtml = false, replyUrl = null ) {
  const templateData = {
    FIRSTNAME: data.firstname,
    LASTNAME: data.lastname,
    EMAIL: data.email,
    PHONE: data.phone || '',
    SERVICE: serviceLabel,
    MESSAGE: isHtml ? formatMessageForHtml( data.message ) : data.message
  };

  if ( replyUrl ) {
    templateData.REPLY_URL = replyUrl;
  }

  return templateData;
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
 * @param {string|null} contactId - Contact ID for email tracking
 * @returns {Promise<Object>} - Resend response
 */
export async function sendContactEmail( data, recipientEmail, contactId = null ) {
  if ( !recipientEmail ) {
    throw new Error( 'Recipient email is required' );
  }

  const resend = getResendClient();
  const fromEmail = getResendFromEmail();
  const serviceLabel = getServiceLabel( data.service );
  const senderName = `${data.firstname} ${data.lastname}`;
  const baseUrl = getBaseUrl();

  // Load templates
  const htmlTemplate = loadContactFormHtmlTemplate();
  const textTemplate = loadContactFormTextTemplate();

  // Generate reply URL if contactId is provided and valid
  let replyUrl = null;
  if ( contactId && isValidObjectId( contactId ) ) {
    replyUrl = `${baseUrl}/admin?contact=${contactId}`;
  }

  // Prepare and render templates
  const htmlTemplateData = prepareTemplateData( data, serviceLabel, true, replyUrl );
  const textTemplateData = prepareTemplateData( data, serviceLabel, false );

  // Render templates
  let emailHtml = renderTemplate( htmlTemplate, htmlTemplateData );

  // Add tracking pixel if contactId is provided and valid
  if ( contactId && isValidObjectId( contactId ) ) {
    const trackingUrl = EMAIL_TRACKING.CONTACT_EMAIL( contactId, baseUrl );
    emailHtml = emailHtml.replace(
      '</body>',
      `<img src="${trackingUrl}" width="1" height="1" style="display:none;" alt="" /></body>`
    );
  }

  const emailText = renderTemplate( textTemplate, textTemplateData ).trim();

  // Format email addresses
  const fromAddress = `${senderName} via Portfolio <${fromEmail}>`;
  const replyToAddress = formatEmailAddress( senderName, data.email );
  const subject = EMAIL_SUBJECTS.CONTACT_FORM( senderName, serviceLabel );

  try {
    const result = await resend.emails.send( {
      from: fromAddress,
      to: recipientEmail,
      replyTo: replyToAddress,
      subject,
      html: emailHtml,
      text: emailText
    } );

    return handleResendResponse( result );
  } catch ( error ) {
    throw new Error( `Failed to send email: ${error.message}` );
  }
}

