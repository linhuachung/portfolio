import { FILE_REGEX } from '@/constants/regex-patterns';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

/**
 * Upload file to AWS S3
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - File name
 * @param {string} originalFileName - Original file name
 * @returns {Promise<{path: string, fileName: string, originalFileName: string}>}
 */
export async function uploadFileToS3( fileBuffer, fileName, originalFileName ) {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const s3Folder = process.env.AWS_S3_FOLDER || 'resume';
  const s3BaseUrl = process.env.AWS_S3_BASE_URL;

  if ( !accessKeyId || !secretAccessKey || !bucketName ) {
    throw new Error( 'AWS S3 credentials are not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET_NAME' );
  }

  try {
    const s3Client = new S3Client( {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    } );

    const key = `${s3Folder}/${fileName}`;

    const command = new PutObjectCommand( {
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: 'application/pdf'
    } );

    await s3Client.send( command );

    // Construct public URL
    let publicUrl;
    if ( s3BaseUrl ) {
      // Use custom base URL (e.g., CloudFront)
      publicUrl = `${s3BaseUrl.replace( FILE_REGEX.TRAILING_SLASH, '' )}/${key}`;
    } else {
      // Use default S3 URL
      publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    }

    // Validate constructed URL
    try {
      new URL( publicUrl );
    } catch {
      throw new Error( `Invalid URL constructed: ${publicUrl}` );
    }

    return {
      path: publicUrl,
      fileName,
      originalFileName
    };
  } catch ( error ) {
    // More detailed error message
    const errorMessage = error.name === 'S3ServiceException' || error.name?.includes( 'S3' )
      ? `S3 upload failed: ${error.message}`
      : `Failed to upload file to S3: ${error.message}`;
    throw new Error( errorMessage );
  }
}
