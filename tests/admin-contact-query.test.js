import assert from 'node:assert/strict';
import test from 'node:test';
import { parseAdminContactQuery } from '../lib/admin-contact-query.js';

test( 'admin contact query applies safe defaults and allowlists', () => {
  const parsed = parseAdminContactQuery( new URLSearchParams( 'status=unknown&page=-4&limit=999&sort=random' ) );

  assert.deepEqual( parsed, {
    status: 'all',
    query: '',
    page: 1,
    limit: 25,
    sort: 'newest'
  } );
} );

test( 'admin contact query normalizes supported filters', () => {
  const parsed = parseAdminContactQuery( new URLSearchParams( 'status=read&q=%20banking%20&page=3&limit=20&sort=oldest' ) );

  assert.deepEqual( parsed, {
    status: 'read',
    query: 'banking',
    page: 3,
    limit: 20,
    sort: 'oldest'
  } );
} );
