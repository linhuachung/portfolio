import { EMAIL_DEFAULTS, EMAIL_SUBJECTS, EMAIL_TRACKING } from '@/constants/email-config';
import { formatMessageForHtml, getBaseUrl, isValidEmailFormat, isValidObjectId } from '@/lib/email-utils';
import { getResendClient, getResendFromEmail, handleResendResponse } from '@/lib/resend-client';

/**
 * Send reply email to contact
 * @param {Object} data - Reply data
 * @param {string} data.contactId - Contact ID
 * @param {string} data.recipientEmail - Email to send reply to
 * @param {string} data.recipientName - Name of recipient
 * @param {string} data.replyMessage - Reply message content
 * @param {string} data.originalMessage - Original message from contact
 * @param {string} data.adminName - Admin name (your name)
 * @param {string} data.adminEmail - Admin email (your email)
 * @returns {Promise<Object>} - Resend response
 */
export async function sendReplyEmail( data ) {
  if ( !data.recipientEmail || !data.replyMessage ) {
    throw new Error( 'Recipient email and reply message are required' );
  }

  if ( !isValidEmailFormat( data.recipientEmail ) ) {
    throw new Error( `Invalid recipient email format: ${data.recipientEmail}` );
  }

  const resend = getResendClient();
  const fromEmail = getResendFromEmail();
  const baseUrl = getBaseUrl();
  const adminName = data.adminName || EMAIL_DEFAULTS.ADMIN_NAME;
  const adminEmail = data.adminEmail;

  // Generate tracking URL if contactId is provided and valid
  let trackingUrl = null;
  if ( data.contactId && isValidObjectId( data.contactId ) ) {
    trackingUrl = EMAIL_TRACKING.REPLY_EMAIL( data.contactId, baseUrl );
  }

  // Format email addresses
  const fromAddress = `${adminName} <${fromEmail}>`;
  const replyTo = adminEmail && adminEmail !== fromEmail ? adminEmail : undefined;

  // Create reply email HTML
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f3f4f6;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 2px solid #008844;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .header h2 {
            margin: 0;
            color: #008844;
            font-size: 20px;
          }
          .original-message {
            background-color: #f9fafb;
            border-left: 3px solid #9ca3af;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .original-message-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .reply-message {
            background-color: rgba(0, 136, 68, 0.08);
            border-left: 3px solid rgba(0, 136, 68, 0.5);
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #9ca3af;
            text-align: center;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          .signature-name {
            font-weight: 600;
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 4px;
          }
          .signature-title {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 16px;
          }
          .signature-info {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.8;
            margin-top: 12px;
          }
          .signature-info a {
            color: #008844;
            text-decoration: none;
          }
          .signature-divider {
            border-top: 1px solid #d1d5db;
            margin: 20px 0;
          }
          .previous-replies {
            margin: 20px 0;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          .previous-replies-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 12px;
          }
          .previous-reply-item {
            background-color: rgba(0, 136, 68, 0.08);
            border-left: 3px solid rgba(0, 136, 68, 0.5);
            padding: 12px;
            margin-bottom: 12px;
            border-radius: 4px;
          }
          .previous-reply-date {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 6px;
          }
          .previous-reply-message {
            font-size: 13px;
            color: #4b5563;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>Re: Your Contact Form Submission</h2>
          </div>
          <p>Hi ${data.recipientName},</p>
          <div class="previous-reply-item">
            <div class="previous-reply-date">
              ${data.adminName || 'Lin Hua Chung'} - ${new Date().toLocaleString()}
            </div>
            <div class="previous-reply-message">${formatMessageForHtml( data.replyMessage )}</div>
          </div>
          ${( data.previousReplies && Array.isArray( data.previousReplies ) && data.previousReplies.length > 0 ) ? `
            <div class="previous-replies">
              <div class="previous-replies-label">Previous Replies:</div>
              ${data.previousReplies.map( ( prevReply ) => `
                <div class="previous-reply-item">
                  <div class="previous-reply-date">
                    ${data.adminName || 'Lin Hua Chung'} - ${new Date( prevReply.createdAt ).toLocaleString()}
                  </div>
                  <div class="previous-reply-message">${formatMessageForHtml( prevReply.message || '' )}</div>
                </div>
              ` ).join( '' )}
            </div>
          ` : ''}
          ${data.originalMessage ? `
            <div class="original-message">
              <div class="original-message-label">Your Original Message:</div>
              <div>${formatMessageForHtml( data.originalMessage )}</div>
            </div>
          ` : ''}
          <div class="signature">
            <p style="margin: 0 0 20px 0;">Kind regards,</p>
            <div class="signature-divider"></div>
            <div class="signature-name">Lin Hua Chung (Mr)</div>
            <div class="signature-title">Frontend Developer</div>
            <div class="signature-info">
              📧 <a href="mailto:chunglh1304@gmail.com">chunglh1304@gmail.com</a><br>
              📞 <a href="tel:+84849966277">(+84) 84 9966 277</a><br>
              🌐 <a href="${baseUrl}" target="_blank">Portfolio</a>
            </div>
          </div>
          <div class="footer">
            <p>This is a reply to your contact form submission.</p>
          </div>
        </div>
        ${trackingUrl ? `<img src="${trackingUrl}" width="1" height="1" style="display:none;" alt="" />` : ''}
      </body>
    </html>
  `;

  const emailText = `
${EMAIL_SUBJECTS.REPLY}

Hi ${data.recipientName},

${data.replyMessage}

${data.previousReplies && data.previousReplies.length > 0 ? `\nPrevious Replies:\n${data.previousReplies.map( ( prevReply ) => `\n${adminName} - ${new Date( prevReply.createdAt ).toLocaleString()}:\n${prevReply.message}\n` ).join( '\n' )}\n` : ''}
${data.originalMessage ? `\nYour Original Message:\n${data.originalMessage}\n` : ''}

Kind regards,

----------------------------------------------------------------------------------

Lin Hua Chung (Mr)
Frontend Developer

📧 chunglh1304@gmail.com
📞 (+84) 84 9966 277
🌐 Portfolio: ${baseUrl}

---
This is a reply to your contact form submission.
  `.trim();

  try {
    const emailData = {
      from: fromAddress,
      to: data.recipientEmail,
      subject: EMAIL_SUBJECTS.REPLY,
      html: emailHtml,
      text: emailText
    };

    if ( replyTo ) {
      emailData.replyTo = replyTo;
    }

    const result = await resend.emails.send( emailData );
    return handleResendResponse( result, 'reply email' );
  } catch ( error ) {
    throw new Error( `Failed to send reply email: ${error.message}` );
  }
}

