import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeRateLimit } from '../lib/rate-limit.js';

test( 'rate limiter blocks requests over the window limit and resets', () => {
  const options = { limit: 2, windowMs: 1000 };
  assert.equal( consumeRateLimit( 'test:one', options, 0 ).allowed, true );
  assert.equal( consumeRateLimit( 'test:one', options, 1 ).allowed, true );
  assert.equal( consumeRateLimit( 'test:one', options, 2 ).allowed, false );
  assert.equal( consumeRateLimit( 'test:one', options, 1001 ).allowed, true );
} );
