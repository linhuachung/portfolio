import test from 'node:test';
import assert from 'node:assert/strict';
import { generateRefreshToken, generateToken, verifyRefreshToken, verifyToken } from '../src/features/auth/server/jwt.js';

test( 'access token preserves the admin authorization claim and rejects tampering', () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'unit-test-secret-with-sufficient-entropy';
  try {
    const token = generateToken( { id: 'admin-id', username: 'admin', role: 'admin' } );
    assert.equal( verifyToken( token ).role, 'admin' );
    const parts = token.split( '.' );
    const signatureIndex = Math.floor( parts[2].length / 2 );
    const replacement = parts[2][signatureIndex] === 'a' ? 'b' : 'a';
    parts[2] = `${parts[2].slice( 0, signatureIndex )}${replacement}${parts[2].slice( signatureIndex + 1 )}`;
    assert.equal( verifyToken( parts.join( '.' ) ), null );
  } finally {
    if ( previousSecret === undefined ) {delete process.env.JWT_SECRET;}
    else {process.env.JWT_SECRET = previousSecret;}
  }
} );

test( 'refresh tokens are not accepted as access tokens even with a shared secret', () => {
  const previous = { access: process.env.JWT_SECRET, refresh: process.env.JWT_REFRESH_SECRET };
  process.env.JWT_SECRET = 'unit-test-secret-with-sufficient-entropy';
  delete process.env.JWT_REFRESH_SECRET;
  try {
    const claims = { id: 'admin-id', username: 'admin', role: 'admin' };
    assert.equal( verifyToken( generateRefreshToken( claims ) ), null );
    assert.equal( verifyRefreshToken( generateToken( claims ) ), null );
    assert.equal( verifyRefreshToken( generateRefreshToken( claims ) ).typ, 'refresh' );
  } finally {
    if ( previous.access === undefined ) {delete process.env.JWT_SECRET;} else {process.env.JWT_SECRET = previous.access;}
    if ( previous.refresh !== undefined ) {process.env.JWT_REFRESH_SECRET = previous.refresh;}
  }
} );
