import { FILE_UPLOAD, generateUniqueFileName } from '@/constants/file-upload';
import { FILE_REGEX } from '@/constants/regex-patterns';
import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { uploadFileToS3 } from '@/lib/s3-upload';
import { NextResponse } from 'next/server';

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

    // Validate file name
    if ( !file.name || file.name.trim() === '' ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid file name' );
    }

    // Validate filename doesn't contain dangerous characters
    if ( FILE_REGEX.DANGEROUS_CHARS.test( file.name ) ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'File name contains invalid characters' );
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

    // Upload to S3 (required)
    if ( !process.env.AWS_S3_BUCKET_NAME ) {
      return createErrorResponse(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'AWS S3 is not configured. Please set AWS_S3_BUCKET_NAME in environment variables.'
      );
    }

    let publicPath;
    let uploadedFileName = fileName;

    try {
      const uploadResult = await uploadFileToS3( buffer, fileName, file.name );
      publicPath = uploadResult.path;
      uploadedFileName = uploadResult.fileName;
    } catch ( uploadError ) {
      return createErrorResponse(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        uploadError.message || 'Failed to upload file to S3'
      );
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'File uploaded successfully', {
        path: publicPath,
        fileName: uploadedFileName,
        originalFileName: file.name
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'CV upload' );
  }
}

