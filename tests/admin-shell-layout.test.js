import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile( new URL( `../${path}`, import.meta.url ), 'utf8' );

test( 'admin shell reserves permanent drawer width exactly once', async () => {
  const source = await read( 'app/(admin)/admin/components/AdminNavigationShell.styles.js' );
  const mainStage = source.slice( source.indexOf( 'export const MainStage' ) );

  assert.match( mainStage, /flex:\s*1/ );
  assert.doesNotMatch( mainStage, /marginLeft:\s*drawerWidth/ );
  assert.doesNotMatch( mainStage, /width:\s*`calc\(100% -/ );
} );

test( 'admin shell uses one resilient desktop navigation breakpoint', async () => {
  const source = await read( 'app/(admin)/admin/components/AdminNavigationShell.jsx' );
  const breakpointUses = source.match( /min-width:\s*1024px/g ) || [];

  assert.equal( breakpointUses.length, 3 );
} );

test( 'admin brand renders the saved profile image instead of name initials', async () => {
  const [shellSource, styleSource, formSource] = await Promise.all( [
    read( 'app/(admin)/admin/components/AdminNavigationShell.jsx' ),
    read( 'app/(admin)/admin/components/AdminNavigationShell.styles.js' ),
    read( 'app/(admin)/admin/user/hooks/useUserForm.js' )
  ] );

  assert.doesNotMatch( shellSource, /<BrandMark[^>]*>\s*LC\s*<\/BrandMark>/ );
  assert.match( shellSource, /<BrandMark[^>]*src=\{\s*profileAvatar\s*\|\|\s*undefined\s*\}/ );
  assert.match( shellSource, /\/api\/admin\/user/ );
  assert.match( shellSource, /portfolio:profile-updated/ );
  assert.match( formSource, /portfolio:profile-updated/ );
  assert.match( styleSource, /styled\(\s*Avatar\s*\)/ );
} );

test( 'inbox search keeps a readable measure on wide screens', async () => {
  const source = await read( 'app/(admin)/admin/contact/Inbox.styles.js' );

  assert.match( source, /minmax\(320px,\s*720px\)/ );
  assert.match( source, /justifyContent:\s*'start'/ );
} );
