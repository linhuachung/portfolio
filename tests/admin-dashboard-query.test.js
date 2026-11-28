import assert from 'node:assert/strict';
import test from 'node:test';
import { parseDashboardPeriod } from '../src/features/dashboard/server/dashboard-query.js';

test( 'dashboard period only accepts the public allowlist', () => {
  assert.equal( parseDashboardPeriod( new URLSearchParams() ), 'month' );
  assert.equal( parseDashboardPeriod( new URLSearchParams( 'period=day' ) ), 'day' );
  assert.equal( parseDashboardPeriod( new URLSearchParams( 'period=year' ) ), 'year' );
  assert.equal( parseDashboardPeriod( new URLSearchParams( 'period=everything' ) ), 'month' );
} );
