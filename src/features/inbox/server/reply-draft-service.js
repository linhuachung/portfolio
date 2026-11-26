import prismadb from '@/server/db';
import { HttpError } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';
import { buildReplyDraftPrompt, normalizeReplyDraftRequest } from './ai-reply';
import { generateGeminiText, geminiModel, isGeminiConfigured } from './gemini-client';

const OBJECT_ID = /^[a-f\d]{24}$/i;

/** Drafts a reply to contact `id` for the admin to review. Nothing is sent. */
export async function generateReplyDraft( id, body ) {
  if ( !isGeminiConfigured() ) {
    throw new HttpError( STATUS_CODES.SERVICE_UNAVAILABLE, 'AI drafting is not configured. Add GEMINI_API_KEY on the server.' );
  }
  if ( !OBJECT_ID.test( id || '' ) ) {throw new HttpError( STATUS_CODES.BAD_REQUEST, 'A valid contact ID is required' );}

  const request = normalizeReplyDraftRequest( body || {} );
  const contact = await prismadb.contact.findUnique( {
    where: { id },
    select: {
      name: true, firstname: true, lastname: true, service: true, message: true,
      replies: { orderBy: { createdAt: 'desc' }, take: 5, select: { message: true } }
    }
  } );
  if ( !contact ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Contact not found' );}

  const prompt = buildReplyDraftPrompt( {
    contact: { ...contact, name: contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim() },
    previousReplies: contact.replies,
    ...request
  } );

  return { draft: await generateGeminiText( prompt ), tone: request.tone, model: geminiModel() };
}
