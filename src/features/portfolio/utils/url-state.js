export function getAllowedValue( searchParams, key, allowedValues, fallback ) {
  const value = searchParams?.get?.( key );
  return allowedValues.includes( value ) ? value : fallback;
}

export function createQueryHref( pathname, searchParams, updates ) {
  const next = new URLSearchParams( searchParams?.toString?.() || '' );

  Object.entries( updates ).forEach( ( [key, value] ) => {
    if ( value ) {
      next.set( key, value );
    } else {
      next.delete( key );
    }
  } );

  return `${pathname}?${next.toString()}`;
}
