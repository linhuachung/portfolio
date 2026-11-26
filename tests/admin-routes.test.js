import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { ADMIN_LINKS } from '../constants/route.js';

const routeToPage = route => {
  if ( route === '/admin' ) {
    return path.join( process.cwd(), 'app', '(admin)', 'admin', 'page.jsx' );
  }

  return path.join( process.cwd(), 'app', '(admin)', 'admin', ...route.split( '/' ).filter( Boolean ).slice( 1 ), 'page.jsx' );
};

test( 'every admin navigation destination has an implemented page', () => {
  const missingRoutes = ADMIN_LINKS
    .map( link => link.path )
    .filter( route => !existsSync( routeToPage( route ) ) );

  assert.deepEqual( missingRoutes, [] );
} );
