export function getErrorMessage( fieldError, errorPath ) {
  if ( !errorPath || !fieldError ) {
    return null;
  }
  const error = fieldError[errorPath];
  return error?.message || ( typeof error === 'string' ? error : null );
}

