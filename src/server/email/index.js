// Server-only entry point. Never import this from client components.
export { EMAIL_SUBJECTS, EMAIL_DEFAULTS, EMAIL_TRACKING } from './email-config';
export { getBaseUrl, isValidEmailFormat, isValidObjectId, escapeHtml, formatMessageForHtml } from './email-utils';
export { getResendClient, getResendFromEmail, handleResendResponse } from './resend-client';
