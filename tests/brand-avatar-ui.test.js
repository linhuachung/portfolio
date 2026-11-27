import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile( new URL( `../${path}`, import.meta.url ), 'utf8' );

test( 'the header brand is a typographic wordmark; the photo appears once per page', async () => {
  const [headerSource, mobileSource, styleSource, homeSource, resumeSource, avatarHookSource] = await Promise.all( [
    read( 'src/features/portfolio/components/Header/Header.jsx' ),
    read( 'src/features/portfolio/components/MobileNav/MobileNav.jsx' ),
    read( 'src/features/portfolio/styles/Navigation.styles.js' ),
    read( 'src/features/portfolio/components/HomePage/HomePage.jsx' ),
    read( 'src/features/portfolio/components/ResumeContentView/ResumeContentView.jsx' ),
    read( 'src/features/portfolio/hooks/useProfileAvatar/useProfileAvatar.js' )
  ] );

  for ( const source of [headerSource, mobileSource] ) {
    assert.match( source, /<BrandMark[^>]*>LC<\/BrandMark>/ );
    assert.match( source, /Lin Hua Chung/ );
    assert.doesNotMatch( source, /Avatar/ );
  }
  assert.match( styleSource, /export const BrandMark\s*=\s*styled\(\s*Box\s*\)/ );
  assert.match( homeSource, /<ProfileAvatar/ );
  assert.match( resumeSource, /<ProfileAvatar/ );
  assert.match( avatarHookSource, /\/api\/user\/profile/ );
} );
