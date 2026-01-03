import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { NextResponse } from 'next/server';

/**
 * Handle API errors and return appropriate response
 * @param {Error} error - Error object
 * @param {string} _context - Context for error logging
 * @returns {NextResponse} - Error response
 */
export function handleApiError( error, _context = 'API' ) {
  const statusCode = error.status || STATUS_CODES.SERVER_ERROR;
  const message = error.message || 'Internal server error';

  return NextResponse.json(
    DataResponse( statusCode, message, null ),
    { status: statusCode }
  );
}

/**
 * Create error response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {NextResponse} - Error response
 */
export function createErrorResponse( statusCode, message ) {
  return NextResponse.json(
    DataResponse( statusCode, message, null ),
    { status: statusCode }
  );
}

