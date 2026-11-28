import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactPayload } from '../src/features/contact/utils/contact-validation.js';

test( 'accepts the new contact contract without phone or split names', () => {
  const result = validateContactPayload( { name: 'Ada Lovelace', email: 'ada@example.com', service: 'frontend', message: 'A sufficiently useful project brief.' } );
  assert.equal( result.valid, true );
  assert.deepEqual( result.errors, {} );
} );

test( 'returns field-addressable errors for invalid contact data', () => {
  const result = validateContactPayload( { name: '', email: 'bad', service: 'unknown', message: 'short' } );
  assert.deepEqual( Object.keys( result.errors ), ['name', 'email', 'service', 'message'] );
} );
