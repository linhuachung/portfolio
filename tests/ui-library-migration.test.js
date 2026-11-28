import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse( await readFile( new URL( '../package.json', import.meta.url ), 'utf8' ) );

test( 'MUI foundation packages are installed for the Next.js App Router', () => {
  const dependencies = packageJson.dependencies;

  for ( const packageName of [
    '@emotion/cache',
    '@emotion/react',
    '@emotion/styled',
    '@mui/icons-material',
    '@mui/material',
    '@mui/material-nextjs'
  ] ) {
    assert.ok( dependencies[packageName], `${packageName} must be a production dependency` );
  }
} );

test( 'legacy shadcn and Radix UI dependencies have no remaining consumers', async () => {
  const legacyDependencies = Object.keys( packageJson.dependencies ).filter( packageName => (
    packageName.startsWith( '@radix-ui/' ) || [
      'class-variance-authority',
      'lucide-react',
      'react-toastify'
    ].includes( packageName )
  ) );
  assert.deepEqual( legacyDependencies, [] );

  const sourceRoots = ['src'];
  const sourceFiles = [];
  const collectSourceFiles = async directory => {
    for ( const entry of await readdir( directory, { withFileTypes: true } ) ) {
      const path = `${directory}/${entry.name}`;
      // Server modules render email HTML, not React UI.
      if ( entry.isDirectory() && entry.name === 'server' ) {continue;}
      if ( entry.isDirectory() ) {
        await collectSourceFiles( path );
      } else if ( /\.(js|jsx|ts|tsx)$/.test( entry.name ) ) {
        sourceFiles.push( path );
      }
    }
  };
  for ( const root of sourceRoots ) {await collectSourceFiles( root );}

  const legacyImports = [];
  for ( const file of sourceFiles ) {
    const source = await readFile( file, 'utf8' );
    if ( /@radix-ui|@\/components\/ui|lucide-react|react-toastify|class-variance-authority/.test( source ) ) {
      legacyImports.push( file );
    }
  }
  assert.deepEqual( legacyImports, [] );
} );

test( 'interactive and form controls use MUI primitives instead of raw JSX elements', async () => {
  const sourceRoots = ['src'];
  const sourceFiles = [];
  const collectSourceFiles = async directory => {
    for ( const entry of await readdir( directory, { withFileTypes: true } ) ) {
      const path = `${directory}/${entry.name}`;
      // Server modules render email HTML, not React UI.
      if ( entry.isDirectory() && entry.name === 'server' ) {continue;}
      if ( entry.isDirectory() ) {
        await collectSourceFiles( path );
      } else if ( /\.(js|jsx|ts|tsx)$/.test( entry.name ) ) {
        sourceFiles.push( path );
      }
    }
  };
  for ( const root of sourceRoots ) {await collectSourceFiles( root );}

  const rawControlConsumers = [];
  for ( const file of sourceFiles ) {
    const source = await readFile( file, 'utf8' );
    if ( /<(a|button|form|input|select|textarea|label|option)\b/.test( source ) ) {
      rawControlConsumers.push( file );
    }
  }

  assert.deepEqual( rawControlConsumers, [] );
} );

test( 'rendered JSX uses MUI primitives instead of raw structural or typography tags', async () => {
  const sourceRoots = ['src'];
  const sourceFiles = [];
  const collectSourceFiles = async directory => {
    for ( const entry of await readdir( directory, { withFileTypes: true } ) ) {
      const path = `${directory}/${entry.name}`;
      // Server modules render email HTML, not React UI.
      if ( entry.isDirectory() && entry.name === 'server' ) {continue;}
      if ( entry.isDirectory() ) {
        await collectSourceFiles( path );
      } else if ( /\.(js|jsx|ts|tsx)$/.test( entry.name ) ) {
        sourceFiles.push( path );
      }
    }
  };
  for ( const root of sourceRoots ) {await collectSourceFiles( root );}

  const rawElementConsumers = [];
  for ( const file of sourceFiles ) {
    const source = await readFile( file, 'utf8' );
    const rawTags = [...source.matchAll( /<([a-z][a-z0-9]*)(?=[\s/>])/g )]
      .map( match => match[1] )
      .filter( tag => !( file === 'src/app/layout.jsx' && ['html', 'head', 'body', 'script'].includes( tag ) ) )
      // SVG path data for MUI createSvgIcon: the way @mui/icons-material itself builds icons.
      .filter( tag => !( file === 'src/features/portfolio/components/SkillIcon/brand-icons.jsx' && tag === 'path' ) );
    if ( rawTags.length ) {
      rawElementConsumers.push( { file, tags: [...new Set( rawTags )].sort() } );
    }
  }

  assert.deepEqual( rawElementConsumers, [] );
} );

test( 'styling is owned by MUI theme and styled components, not global CSS or utility classes', async () => {
  const projectRoot = new URL( '..', import.meta.url );
  const roots = ['src'];
  const files = [];
  const collect = async directory => {
    for ( const entry of await readdir( new URL( `${directory}/`, projectRoot ), { withFileTypes: true } ) ) {
      const path = `${directory}/${entry.name}`;
      if ( entry.isDirectory() ) {await collect( path );}
      else {files.push( path );}
    }
  };
  for ( const root of roots ) {await collect( root );}

  assert.deepEqual( files.filter( file => file.endsWith( '.css' ) ), [] );
  assert.equal( packageJson.dependencies['tailwind-merge'], undefined );
  assert.equal( packageJson.devDependencies.tailwindcss, undefined );
  assert.equal( packageJson.devDependencies['tailwindcss-animate'], undefined );
  // Icons come from @mui/icons-material (brand logos via MUI createSvgIcon); motion from MUI/CSS.
  assert.equal( packageJson.dependencies['react-icons'], undefined );
  assert.equal( packageJson.dependencies['framer-motion'], undefined );

  const classNameConsumers = [];
  for ( const file of files.filter( file => /\.(js|jsx|ts|tsx)$/.test( file ) ) ) {
    const source = await readFile( new URL( file, projectRoot ), 'utf8' );
    if ( /className\s*=/.test( source ) ) {classNameConsumers.push( file );}
  }
  assert.deepEqual( classNameConsumers, [] );
} );
