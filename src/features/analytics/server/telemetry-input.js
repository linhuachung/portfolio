function boundedString( value, maxLength ) {
  return typeof value === 'string' ? value.trim().slice( 0, maxLength ) : '';
}

export function parseVisitTelemetry( input ) {
  const path = boundedString( input?.path, 200 );
  return {
    path: path.startsWith( '/' ) && !path.startsWith( '//' ) ? path : '/',
    userAgent: boundedString( input?.userAgent, 500 ) || null,
    referer: boundedString( input?.referer, 500 ) || null
  };
}

export function parseDownloadTelemetry( input ) {
  return { userAgent: boundedString( input?.userAgent, 500 ) || null };
}
