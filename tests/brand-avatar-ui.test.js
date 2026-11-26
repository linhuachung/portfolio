import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile( new URL( `../${path}`, import.meta.url ), 'utf8' );

test( 'public desktop and mobile brands render the profile image instead of name text', async () => {
  const [headerSource, mobileSource, styleSource] = await Promise.all( [
    read( 'components/Header.jsx' ),
    read( 'components/MobileNav.jsx' ),
    read( 'components/styled/Navigation.styles.js' )
  ] );

  assert.doesNotMatch( headerSource, />\s*CHUNG\s*</ );
  assert.doesNotMatch( mobileSource, /!isAdmin\s*\?\s*'Chung'/ );
  assert.match( headerSource, /\/api\/user\/profile/ );
  assert.match( headerSource, /<BrandAvatar[^>]*src=\{\s*profileAvatar\s*\|\|\s*undefined\s*\}/ );
  assert.match( mobileSource, /<BrandAvatar[^>]*src=\{\s*avatar\s*\|\|\s*undefined\s*\}/ );
  assert.match( styleSource, /export const BrandAvatar\s*=\s*styled\(\s*Avatar\s*\)/ );
} );
