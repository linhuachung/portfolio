import { FILE_UPLOAD, generateUniqueFileName } from '@/constants/file-upload';
import { FILE_REGEX } from '@/constants/regex-patterns';
import STATUS_CODES from '@/constants/status';
import { createErrorResponse } from '@/lib/api-error-handler';
import { uploadFileToS3 } from '@/lib/s3-upload';

/**
 * Upload type configurations
 */
export const UPLOAD_TYPES = {
  CV: {
    prefix: 'CV',
    folder: process.env.AWS_S3_FOLDER || 'resume',
    config: FILE_UPLOAD.CV,
    contentType: 'application/pdf',
    successMessage: 'File uploaded successfully'
  },
  IMAGE: {
    prefix: 'IMG',
    folder: process.env.AWS_S3_IMAGES_FOLDER || 'images',
    config: FILE_UPLOAD.IMAGE,
    contentType: null, // Will use file.type
    successMessage: 'Image uploaded successfully'
  }
};

/**
 * Validate file for upload
 * @param {File} file - File object from form data
 * @param {Object} uploadType - Upload type configuration
 * @returns {{valid: boolean, error?: string}}
 */
export function validateFileForUpload( file, uploadType ) {
  if ( !file ) {
    return { valid: false, error: 'No file provided' };
  }

  if ( !file.name || file.name.trim() === '' ) {
    return { valid: false, error: 'Invalid file name' };
  }

  if ( FILE_REGEX.DANGEROUS_CHARS.test( file.name ) ) {
    return { valid: false, error: 'File name contains invalid characters' };
  }

  const config = uploadType.config;
  if ( !config.ACCEPTED_TYPES.includes( file.type ) ) {
    const allowedTypes = config.ACCEPT_EXTENSIONS
      ? config.ACCEPT_EXTENSIONS.join( ', ' ).toUpperCase()
      : config.ACCEPTED_TYPES.map( t => t.split( '/' )[1]?.toUpperCase() || t ).join( ', ' );
    return {
      valid: false,
      error: `Only ${allowedTypes} files are allowed`
    };
  }

  if ( file.size > config.MAX_SIZE_BYTES ) {
    return {
      valid: false,
      error: `File size must be less than ${config.MAX_SIZE_MB}MB`
    };
  }

  return { valid: true };
}

/**
 * Validate buffer before upload
 * @param {Buffer} buffer - File buffer
 * @returns {{valid: boolean, error?: string}}
 */
export function validateBuffer( buffer ) {
  if ( !buffer ) {
    return { valid: false, error: 'File buffer is required' };
  }

  if ( !Buffer.isBuffer( buffer ) ) {
    return { valid: false, error: 'Invalid file buffer format' };
  }

  if ( buffer.length === 0 ) {
    return { valid: false, error: 'File is empty or corrupted' };
  }

  return { valid: true };
}

/**
 * Handle file upload to S3
 * @param {Request} req - Next.js request object
 * @param {Object} uploadType - Upload type configuration (UPLOAD_TYPES.CV or UPLOAD_TYPES.IMAGE)
 * @returns {Promise<{success: boolean, data?: Object, error?: NextResponse}>}
 */
export async function handleFileUpload( req, uploadType ) {
  // Get file from form data
  const formData = await req.formData();
  const file = formData.get( 'file' );

  // Validate file
  const fileValidation = validateFileForUpload( file, uploadType );
  if ( !fileValidation.valid ) {
    return {
      error: createErrorResponse( STATUS_CODES.BAD_REQUEST, fileValidation.error )
    };
  }

  // Check AWS S3 configuration
  if ( !process.env.AWS_S3_BUCKET_NAME ) {
    return {
      error: createErrorResponse(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'AWS S3 is not configured. Please set AWS_S3_BUCKET_NAME in environment variables.'
      )
    };
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from( bytes );

  // Validate buffer
  const bufferValidation = validateBuffer( buffer );
  if ( !bufferValidation.valid ) {
    return {
      error: createErrorResponse( STATUS_CODES.BAD_REQUEST, bufferValidation.error )
    };
  }

  // Generate unique filename
  const fileName = generateUniqueFileName( file.name, uploadType.prefix );

  // Determine content type
  const contentType = uploadType.contentType || file.type;

  // Validate content type
  if ( !contentType || typeof contentType !== 'string' ) {
    return {
      error: createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid content type' )
    };
  }

  try {
    const uploadResult = await uploadFileToS3(
      buffer,
      fileName,
      file.name,
      contentType,
      uploadType.folder
    );

    return {
      success: true,
      data: {
        path: uploadResult.path,
        fileName: uploadResult.fileName,
        originalFileName: file.name
      },
      successMessage: uploadType.successMessage
    };
  } catch ( uploadError ) {
    return {
      error: createErrorResponse(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        uploadError.message || 'Failed to upload file to S3'
      )
    };
  }
}

