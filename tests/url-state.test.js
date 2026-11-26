import test from 'node:test';
import assert from 'node:assert/strict';
import { createQueryHref, getAllowedValue } from '../lib/url-state.js';

test( 'query values are constrained to an allowlist', () => {
  const params = new URLSearchParams( 'project=unknown&panel=contributions' );
  assert.equal( getAllowedValue( params, 'project', ['nab', 'mercatus'], 'nab' ), 'nab' );
  assert.equal( getAllowedValue( params, 'panel', ['overview', 'contributions'], 'overview' ), 'contributions' );
} );

test( 'query href preserves unrelated state and applies updates', () => {
  const params = new URLSearchParams( 'project=nab&panel=overview' );
  assert.equal( createQueryHref( '/work', params, { project: 'mercatus' } ), '/work?project=mercatus&panel=overview' );
} );
