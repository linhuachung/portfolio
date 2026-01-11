import prismadb from '@/lib/prisma';

export async function ensureTechStacksExist( techStackNames ) {
  if ( !techStackNames || techStackNames.length === 0 ) {
    return new Map();
  }

  const uniqueNames = [...new Set( techStackNames.map( name => name.trim() ).filter( name => name ) )];

  if ( uniqueNames.length === 0 ) {
    return new Map();
  }

  const existingTechStacks = await prismadb.techStack.findMany( {
    where: {
      name: { in: uniqueNames }
    }
  } );

  const techStackMap = new Map( existingTechStacks.map( ts => [ts.name, ts.id] ) );

  const missingNames = uniqueNames.filter( name => !techStackMap.has( name ) );

  if ( missingNames.length > 0 ) {
    for ( const name of missingNames ) {
      try {
        const newTechStack = await prismadb.techStack.create( {
          data: { name: name.trim() }
        } );
        techStackMap.set( name, newTechStack.id );
      } catch ( error ) {
        if ( error.code === 'P2002' ) {
          const existing = await prismadb.techStack.findUnique( {
            where: { name: name.trim() }
          } );
          if ( existing ) {
            techStackMap.set( name, existing.id );
          }
        } else {
          throw error;
        }
      }
    }
  }

  return techStackMap;
}

export function buildExperienceTechStacks( techStackNames, techStackMap, experienceId ) {
  return techStackNames
    .map( name => {
      const techStackId = techStackMap.get( name.trim() );
      return techStackId ? { experienceId, techStackId } : null;
    } )
    .filter( item => item !== null );
}
