// Server-only entry point. Never import this from client components.
export { normalizeReplyDraftRequest, extractGeminiResponseText, buildReplyDraftPrompt } from './ai-reply';
export { parseAdminContactQuery, buildAdminContactWhere } from './contact-query';
export { REPLY_SELECT, listReplies, createReply, updateReply, deleteReply } from './contact-replies';
export { CONTACT_STATUSES, listContacts, getInboxSummary, getContactDetail, updateContact } from './contact-service';
export { isGeminiConfigured, geminiModel, generateGeminiText } from './gemini-client';
export { generateReplyDraft } from './reply-draft-service';
export { sendReplyEmail } from './reply-email';
