import axios from 'axios';
import FormData from 'form-data';

/**
 * Upload file to external server
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - File name
 * @param {string} originalFileName - Original file name
 * @returns {Promise<{path: string, fileName: string}>}
 */
export async function uploadFileToServer( fileBuffer, fileName, originalFileName ) {
  const serverUploadUrl = process.env.FILE_UPLOAD_SERVER_URL;
  const serverApiKey = process.env.FILE_UPLOAD_SERVER_API_KEY;

  if ( !serverUploadUrl ) {
    throw new Error( 'FILE_UPLOAD_SERVER_URL is not configured' );
  }

  try {
    const formData = new FormData();
    formData.append( 'file', fileBuffer, {
      filename: fileName,
      contentType: 'application/pdf'
    } );
    formData.append( 'originalFileName', originalFileName );

    const config = {
      headers: {
        ...formData.getHeaders(),
        ...( serverApiKey && { 'Authorization': `Bearer ${serverApiKey}` } )
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    };

    const response = await axios.post( serverUploadUrl, formData, config );

    if ( response.data && response.data.path ) {
      return {
        path: response.data.path,
        fileName: response.data.fileName || fileName,
        originalFileName: response.data.originalFileName || originalFileName
      };
    }

    throw new Error( 'Invalid response from upload server' );
  } catch ( error ) {
    if ( error.response ) {
      throw new Error( error.response.data?.message || `Upload failed: ${error.response.status}` );
    }
    throw new Error( error.message || 'Failed to upload file to server' );
  }
}

