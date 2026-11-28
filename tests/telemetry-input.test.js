import assert from 'node:assert/strict';
import test from 'node:test';
import { parseDownloadTelemetry, parseVisitTelemetry } from '../src/features/analytics/server/telemetry-input.js';

test( 'visit telemetry keeps bounded browser metadata and safe local paths', () => {
  assert.deepEqual( parseVisitTelemetry( { path: '/resume?section=skills', userAgent: ' browser ', referer: ' https://example.com ' } ), {
    path: '/resume?section=skills',
    userAgent: 'browser',
    referer: 'https://example.com'
  } );
  assert.equal( parseVisitTelemetry( { path: 'https://malicious.example' } ).path, '/' );
  assert.equal( parseVisitTelemetry( { path: '//malicious.example' } ).path, '/' );
} );

test( 'download telemetry drops unsupported fields', () => {
  assert.deepEqual( parseDownloadTelemetry( { userAgent: 'browser', secret: 'ignored' } ), { userAgent: 'browser' } );
} );
