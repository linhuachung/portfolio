/**
 * An expected failure with a status code and a message that is safe to show
 * to the client. Services throw it; route handlers turn it into a response
 * with handleApiError(). `code` is an optional machine-readable reason.
 */
export class HttpError extends Error {
  constructor( status, message, { code } = {} ) {
    super( message );
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }
}
