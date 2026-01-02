import { FILE_UPLOAD, generateUniqueFileName } from '@/constants/file-upload';
import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';

export async function POST( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    // Get file from form data
    const formData = await req.formData();
    const file = formData.get( 'file' );

    if ( !file ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'No file provided' );
    }

    // Validate file type
    if ( !FILE_UPLOAD.CV.ACCEPTED_TYPES.includes( file.type ) ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Only PDF files are allowed' );
    }

    // Validate file size
    if ( file.size > FILE_UPLOAD.CV.MAX_SIZE_BYTES ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, `File size must be less than ${FILE_UPLOAD.CV.MAX_SIZE_MB}MB` );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from( bytes );

    // Generate unique filename
    const fileName = generateUniqueFileName( file.name, 'CV' );
    const filePath = join( process.cwd(), FILE_UPLOAD.CV.UPLOAD_DIR, fileName );

    // Ensure directory exists
    const dirPath = join( process.cwd(), FILE_UPLOAD.CV.UPLOAD_DIR );
    if ( !existsSync( dirPath ) ) {
      await mkdir( dirPath, { recursive: true } );
    }

    // Write file to disk
    await writeFile( filePath, buffer );

    // Return public path
    const publicPath = `${FILE_UPLOAD.CV.PUBLIC_PATH}/${fileName}`;

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'File uploaded successfully', {
        path: publicPath,
        fileName,
        originalFileName: file.name
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'CV upload' );
  }
}

