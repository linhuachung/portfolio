import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

async function routeFiles( directory ) {
  const entries = await fs.readdir( directory, { withFileTypes: true } );
  const nested = await Promise.all( entries.map( entry => {
    const target = path.join( directory, entry.name );
    if ( entry.isDirectory() ) {return routeFiles( target );}
    return entry.name === 'route.js' ? [target] : [];
  } ) );
  return nested.flat();
}

test( 'every non-login admin API verifies authorization inside the route', async () => {
  const root = path.join( process.cwd(), 'src', 'app', 'api', 'admin' );
  const files = await routeFiles( root );
  const publicAuthRoutes = [
    path.join( root, 'auth', 'login', 'route.js' ),
    path.join( root, 'auth', 'refresh', 'route.js' ),
    // Only clears cookies, so it must work after the access token has expired.
    path.join( root, 'auth', 'logout', 'route.js' )
  ];
  const unprotected = [];

  for ( const file of files.filter( item => !publicAuthRoutes.includes( item ) ) ) {
    const source = await fs.readFile( file, 'utf8' );
    if ( !source.includes( 'verifyAuth' ) ) {unprotected.push( path.relative( process.cwd(), file ) );}
  }

  assert.deepEqual( unprotected, [] );
} );

test( 'public telemetry never posts into the admin API namespace', async () => {
  const source = await fs.readFile( path.join( process.cwd(), 'src', 'features', 'analytics', 'api', 'tracking.js' ), 'utf8' );
  assert.equal( source.includes( '/api/admin/' ), false );
  await fs.access( path.join( process.cwd(), 'src', 'app', 'api', 'user', 'analytics', 'visit', 'route.js' ) );
  await fs.access( path.join( process.cwd(), 'src', 'app', 'api', 'user', 'analytics', 'cv-download', 'route.js' ) );
} );

test( 'email tracking pixels use public user routes', async () => {
  const source = await fs.readFile( path.join( process.cwd(), 'src', 'server', 'email', 'email-config.js' ), 'utf8' );
  assert.equal( source.includes( '/api/admin/' ), false );
  await fs.access( path.join( process.cwd(), 'src', 'app', 'api', 'user', 'contact', '[id]', 'track-email', 'route.js' ) );
  await fs.access( path.join( process.cwd(), 'src', 'app', 'api', 'user', 'contact', '[id]', 'replies', '[replyId]', 'track-open', 'route.js' ) );
} );
