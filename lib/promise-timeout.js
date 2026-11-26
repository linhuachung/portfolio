export class OperationTimeoutError extends Error {
  constructor( message = 'Service temporarily unavailable' ) {
    super( message );
    this.name = 'OperationTimeoutError';
    this.status = 503;
  }
}

export function withTimeout( promise, timeoutMs ) {
  let timeoutId;
  const timeout = new Promise( ( _, reject ) => {
    timeoutId = setTimeout( () => reject( new OperationTimeoutError() ), timeoutMs );
  } );

  return Promise.race( [promise, timeout] ).finally( () => clearTimeout( timeoutId ) );
}
