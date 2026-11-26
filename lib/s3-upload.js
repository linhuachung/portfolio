import { FILE_REGEX } from '../constants/regex-patterns.js';
import { createHash, createHmac } from 'node:crypto';

function sha256( value ) {
  return createHash( 'sha256' ).update( value ).digest( 'hex' );
}

function hmac( key, value, encoding ) {
  return createHmac( 'sha256', key ).update( value ).digest( encoding );
}

function encodeKey( key ) {
  return key.split( '/' ).map( segment => encodeURIComponent( segment ) ).join( '/' );
}

export function createS3SignedRequest( { buffer, bucketName, key, region, accessKeyId, secretAccessKey, contentType, now = new Date() } ) {
  const amzDate = now.toISOString().replace( /[:-]|\.\d{3}/g, '' );
  const dateStamp = amzDate.slice( 0, 8 );
  const host = `${bucketName}.s3.${region}.amazonaws.com`;
  const canonicalUri = `/${encodeKey( key )}`;
  const payloadHash = sha256( buffer );
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const canonicalRequest = ['PUT', canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join( '\n' );
  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256( canonicalRequest )].join( '\n' );
  const dateKey = hmac( `AWS4${secretAccessKey}`, dateStamp );
  const regionKey = hmac( dateKey, region );
  const serviceKey = hmac( regionKey, 's3' );
  const signingKey = hmac( serviceKey, 'aws4_request' );
  const signature = hmac( signingKey, stringToSign, 'hex' );

  return {
    url: `https://${host}${canonicalUri}`,
    headers: {
      'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
      'Content-Type': contentType,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate
    }
  };
}

export async function uploadFileToS3( fileBuffer, fileName, originalFileName, contentType = 'application/pdf', folder = null ) {
  if ( !fileBuffer || !Buffer.isBuffer( fileBuffer ) || fileBuffer.length === 0 ) {
    throw new Error( 'A non-empty file buffer is required' );
  }
  if ( !contentType || typeof contentType !== 'string' ) {throw new Error( 'Invalid content type provided' );}

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const s3Folder = folder || process.env.AWS_S3_FOLDER || 'resume';
  const s3BaseUrl = process.env.AWS_S3_BASE_URL;
  if ( !accessKeyId || !secretAccessKey || !bucketName ) {throw new Error( 'AWS S3 credentials are not configured' );}

  const key = `${s3Folder}/${fileName}`;
  const signedRequest = createS3SignedRequest( { buffer: fileBuffer, bucketName, key, region, accessKeyId, secretAccessKey, contentType } );
  const response = await fetch( signedRequest.url, { method: 'PUT', headers: signedRequest.headers, body: fileBuffer } );
  if ( !response.ok ) {
    const detail = ( await response.text() ).slice( 0, 300 );
    throw new Error( `S3 upload failed (${response.status})${detail ? `: ${detail}` : ''}` );
  }

  const publicUrl = s3BaseUrl
    ? `${s3BaseUrl.replace( FILE_REGEX.TRAILING_SLASH, '' )}/${encodeKey( key )}`
    : signedRequest.url;

  return { path: publicUrl, fileName, originalFileName };
}
