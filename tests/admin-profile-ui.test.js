import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile( new URL( `../${path}`, import.meta.url ), 'utf8' );

test( 'profile photo editor exposes persistent upload and remove actions', async () => {
  const source = await read( 'components/ImageUpload.jsx' );

  assert.match( source, /Profile Photo/ );
  assert.match( source, /Upload Photo/ );
  assert.match( source, /Replace Photo/ );
  assert.match( source, /Remove Photo/ );
  assert.match( source, /aria-live="polite"/ );
} );

test( 'profile file removal control has an accessible name', async () => {
  const source = await read( 'components/FileUpload.jsx' );

  assert.match( source, /aria-label="Remove CV file"/ );
} );

test( 'profile editor uses the shared admin studio page contract', async () => {
  const source = await read( 'app/(admin)/admin/user/page.jsx' );

  assert.match( source, /StudioPage/ );
  assert.match( source, /Operational Profile/ );
  assert.match( source, /Unsaved changes/ );
} );

test( 'profile view is read-only text while edit mode mounts editable fields', async () => {
  const [pageSource, viewSource, styleSource] = await Promise.all( [
    read( 'app/(admin)/admin/user/page.jsx' ),
    read( 'app/(admin)/admin/user/components/ProfileReadOnlyView.jsx' ),
    read( 'app/(admin)/admin/user/Profile.styles.js' )
  ] );

  assert.match( pageSource, /ProfileReadOnlyView/ );
  assert.match( pageSource, /ProfileReadOnlyView\s+profile=\{\s*originalData/ );
  assert.match( pageSource, /isEditMode\s*\?\s*\(/ );
  assert.doesNotMatch( pageSource, /disabled=\{\s*!isEditMode\s*\}/ );
  assert.match( styleSource, /ProfileReadOnlyRoot[\s\S]*cursor:\s*'default'/ );
  assert.match( viewSource, /Profile Photo/ );
  assert.match( viewSource, /Social Links/ );
  assert.doesNotMatch( viewSource, /TextField|InputField|TextareaField|Button|IconButton|onClick/ );
  assert.doesNotMatch( viewSource, /profileInitial/ );
} );

test( 'profile form drafts do not mutate persisted view data', async () => {
  const { cloneProfileData } = await import( '../app/(admin)/admin/user/profile-data.js' );
  const persisted = {
    name: 'Lin Hua Chung',
    socialLinks: [{ type: 'github', url: 'https://github.com/linhuachung', order: 0 }]
  };
  const draft = cloneProfileData( persisted );

  draft.name = 'Changed Name';
  draft.socialLinks[0].url = 'https://example.com/changed';

  assert.equal( persisted.name, 'Lin Hua Chung' );
  assert.equal( persisted.socialLinks[0].url, 'https://github.com/linhuachung' );
} );

test( 'profile form preserves every stored social link', async () => {
  const { mergeSocialLinks } = await import( '../lib/social-links-utils.js' );
  const merged = mergeSocialLinks( [
    { type: 'github', url: 'https://github.com/linhuachung', order: 0 },
    { type: 'linkedin', url: 'https://linkedin.com/in/linhuachung', order: 1 }
  ], [{ type: 'github', url: '', order: 0 }] );

  assert.deepEqual( merged.map( link => link.type ), ['github', 'linkedin'] );
} );

test( 'content review pages render visual record identities', async () => {
  const sources = await Promise.all( [
    read( 'app/(admin)/admin/experience/page.jsx' ),
    read( 'app/(admin)/admin/education/page.jsx' ),
    read( 'app/(admin)/admin/project/page.jsx' )
  ] );

  sources.forEach( source => assert.match( source, /RecordAvatar/ ) );
} );
