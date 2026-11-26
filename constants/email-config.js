/**
 * Email configuration constants
 */

export const EMAIL_SUBJECTS = {
  CONTACT_FORM: ( senderName, serviceLabel ) => `New Contact: ${senderName} - ${serviceLabel}`,
  REPLY: 'Re: Your Contact Form Submission'
};

export const EMAIL_DEFAULTS = {
  ADMIN_NAME: 'Portfolio Admin',
  CONTACT_RECIPIENT_FALLBACK: null // Will use user.email from database
};

export const EMAIL_TRACKING = {
  CONTACT_EMAIL: ( contactId, baseUrl ) => `${baseUrl}/api/user/contact/${contactId}/track-email`,
  REPLY_EMAIL: ( contactId, replyId, baseUrl ) => `${baseUrl}/api/user/contact/${contactId}/replies/${replyId}/track-open`
};

