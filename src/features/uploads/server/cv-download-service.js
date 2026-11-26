import prismadb from '@/server/db';
import { HttpError } from '@/server/http';
import { CV_ERROR_CODES } from '../constants/cv-messages';
import { extractFileNameFromUrl, validateCvPath } from '../utils/cv-utils';

const PDF_MAGIC_NUMBER = '%PDF';
const PDF_CONTENT_TYPES = ['application/pdf', 'binary', 'octet-stream'];

// A missing content type is accepted; the PDF signature check below still applies.
const isPdfContentType = contentType => !contentType || PDF_CONTENT_TYPES.some( type => contentType.includes( type ) );

function assertPdf( buffer ) {
  if ( buffer.length === 0 ) {throw new HttpError( 500, 'File is empty or corrupted' );}
  if ( buffer.subarray( 0, 4 ).toString() !== PDF_MAGIC_NUMBER ) {throw new HttpError( 400, 'File is not a valid PDF' );}
}

/**
 * Fetches the owner's uploaded CV from storage and checks that it is a PDF.
 * Storage error details are logged, never returned to the client.
 * @returns {Promise<{ buffer: Buffer, fileName: string }>}
 */
export async function getOwnerCv() {
  const owner = await prismadb.user.findFirst( { select: { cvPath: true } } );
  if ( !owner?.cvPath ) {throw new HttpError( 404, 'CV not found' );}

  const validation = validateCvPath( owner.cvPath );
  if ( !validation.valid ) {
    throw new HttpError( validation.code === CV_ERROR_CODES.NOT_FOUND ? 404 : 400, validation.error, { code: validation.code } );
  }

  let response;
  try {
    response = await fetch( owner.cvPath, { cache: 'no-store' } );
  } catch ( error ) {
    console.error( 'CV fetch from storage failed:', error );
    throw new HttpError( 502, 'Failed to fetch CV file' );
  }
  if ( !response.ok ) {
    throw new HttpError( response.status === 404 ? 404 : 502, 'Failed to fetch CV file. The file may have been moved or deleted.' );
  }

  const contentType = response.headers.get( 'content-type' );
  if ( !isPdfContentType( contentType ) ) {
    console.error( 'CV storage returned an unexpected content type:', contentType );
    throw new HttpError( 400, 'Stored CV is not a PDF' );
  }

  const buffer = Buffer.from( await response.arrayBuffer() );
  assertPdf( buffer );
  return { buffer, fileName: extractFileNameFromUrl( owner.cvPath ) };
}
