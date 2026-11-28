import assert from 'node:assert/strict';
import test from 'node:test';
import { OperationTimeoutError, withTimeout } from '../src/server/utils/promise-timeout.js';

test( 'withTimeout preserves successful operation results', async () => {
  assert.equal( await withTimeout( Promise.resolve( 'ready' ), 50 ), 'ready' );
} );

test( 'withTimeout rejects stalled read operations with a safe service error', async () => {
  await assert.rejects( withTimeout( new Promise( () => {} ), 5 ), OperationTimeoutError );
} );
