import { HttpError } from '../http/http-error.js';

export class OperationTimeoutError extends HttpError {
  constructor( message = 'Service temporarily unavailable' ) {
    super( 503, message );
    this.name = 'OperationTimeoutError';
  }
}

export function withTimeout( promise, timeoutMs ) {
  let timeoutId;
  const timeout = new Promise( ( _, reject ) => {
    timeoutId = setTimeout( () => reject( new OperationTimeoutError() ), timeoutMs );
  } );

  return Promise.race( [promise, timeout] ).finally( () => clearTimeout( timeoutId ) );
}
