import STATUS_CODES from '@/shared/constants/status';
import { NextResponse } from 'next/server';
import { DataResponse } from './data-response';
import { HttpError } from './http-error';

export function createErrorResponse( statusCode, message ) {
  return NextResponse.json( DataResponse( statusCode, message, null ), { status: statusCode } );
}

export function successResponse( message, data = null ) {
  return NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, message, data ), { status: STATUS_CODES.SUCCESS } );
}

/**
 * HttpError keeps its status and message. Anything else is unexpected: it is
 * logged and answered with `fallback` (a generic 500 unless the caller passes
 * a friendlier HttpError).
 */
export function handleApiError( error, context = 'API', fallback = new HttpError( STATUS_CODES.SERVER_ERROR, 'Internal server error' ) ) {
  if ( error instanceof HttpError ) {return createErrorResponse( error.status, error.message );}
  console.error( `${context} failed`, error );
  return createErrorResponse( fallback.status, fallback.message );
}
