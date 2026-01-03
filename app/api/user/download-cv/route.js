import { CV_ERROR_CODES } from '@/constants/cv-messages';
import { extractFileNameFromUrl, validateCvPath } from '@/lib/cv-utils';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

const PDF_MAGIC_NUMBER = '%PDF';
const VALID_CONTENT_TYPES = ['application/pdf', 'binary', 'octet-stream'];

function isValidContentType( contentType ) {
  if ( !contentType ) {
    return true;
  }
  return VALID_CONTENT_TYPES.some( type => contentType.includes( type ) );
}

function validatePdfBuffer( buffer ) {
  if ( !buffer || buffer.length === 0 ) {
    return { valid: false, error: 'File is empty or corrupted' };
  }

  const magicNumber = buffer.slice( 0, 4 ).toString();
  if ( magicNumber !== PDF_MAGIC_NUMBER ) {
    return { valid: false, error: `File is not a valid PDF. First bytes: ${magicNumber}` };
  }

  return { valid: true };
}

export async function GET() {
  try {
    const user = await prismadb.user.findFirst();

    if ( !user || !user.cvPath ) {
      return NextResponse.json( { error: 'CV not found' }, { status: 404 } );
    }

    const cvUrl = user.cvPath;
    const validation = validateCvPath( cvUrl );

    if ( !validation.valid ) {
      const statusCode = validation.code === CV_ERROR_CODES.NOT_FOUND ? 404 : 400;
      return NextResponse.json(
        {
          error: validation.error,
          ...( validation.code && { code: validation.code } )
        },
        { status: statusCode }
      );
    }

    try {
      const response = await fetch( cvUrl, { cache: 'no-store' } );

      if ( !response.ok ) {
        return NextResponse.json(
          { error: 'Failed to fetch CV file. The file may have been moved or deleted.' },
          { status: response.status }
        );
      }

      const contentType = response.headers.get( 'content-type' );
      if ( !isValidContentType( contentType ) ) {
        const errorText = await response.text().catch( () => 'Unknown error' );
        const maxLength = 100;
        return NextResponse.json(
          { error: `Invalid file type from S3: ${contentType}. ${errorText.substring( 0, maxLength )}` },
          { status: 400 }
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from( arrayBuffer );

      const validation = validatePdfBuffer( buffer );
      if ( !validation.valid ) {
        return NextResponse.json(
          { error: validation.error },
          { status: validation.error.includes( 'empty' ) ? 500 : 400 }
        );
      }

      const fileName = extractFileNameFromUrl( cvUrl );

      return new NextResponse( buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      } );
    } catch ( fetchError ) {
      console.error( 'Fetch error from S3:', fetchError );
      return NextResponse.json(
        { error: `Failed to fetch CV file: ${fetchError.message}` },
        { status: 500 }
      );
    }
  } catch ( error ) {
    console.error( 'Error downloading CV:', error );
    return NextResponse.json( { error: 'Failed to download CV' }, { status: 500 } );
  }
}

