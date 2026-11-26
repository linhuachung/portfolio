import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routePath = new URL( '../app/api/admin/contact/[id]/ai-draft/route.js', import.meta.url );
const composerPath = new URL( '../app/(admin)/admin/components/contact-detail/ReplyComposer.jsx', import.meta.url );

test( 'AI reply route uses a server-side Gemini key and native provider endpoint', async () => {
  const source = await readFile( routePath, 'utf8' );

  assert.match( source, /GEMINI_API_KEY/ );
  assert.match( source, /generativelanguage\.googleapis\.com/ );
  assert.match( source, /x-goog-api-key/ );
  assert.doesNotMatch( source, /OPENAI_API_KEY|api\.openai\.com/ );
} );

test( 'AI reply route defaults to a stable Gemini Flash model', async () => {
  const source = await readFile( routePath, 'utf8' );

  assert.match( source, /GEMINI_REPLY_MODEL/ );
  assert.match( source, /gemini-3\.8-flash/ );
} );

test( 'Gemini drafting is stateless and disclosed at the point of use', async () => {
  const [routeSource, composerSource] = await Promise.all( [
    readFile( routePath, 'utf8' ),
    readFile( composerPath, 'utf8' )
  ] );

  assert.match( routeSource, /store:\s*false/ );
  assert.match( composerSource, /Google Gemini/ );
} );
