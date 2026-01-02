/**
 * File upload constants
 */
export const FILE_UPLOAD = {
  CV: {
    MAX_SIZE_MB: 10,
    MAX_SIZE_BYTES: 10 * 1024 * 1024,
    ACCEPTED_TYPES: ['application/pdf'],
    ACCEPT_EXTENSION: '.pdf',
    UPLOAD_DIR: 'public/assets/resume',
    PUBLIC_PATH: '/assets/resume'
  }
};

/**
 * Generate unique filename with prefix
 * @param {string} originalName - Original filename
 * @param {string} prefix - Prefix for filename (e.g., 'CV')
 * @returns {string} - Unique filename
 */
export function generateUniqueFileName( originalName, prefix = 'CV' ) {
  const timestamp = Date.now();
  const sanitizedName = originalName.replace( /[^a-zA-Z0-9.-]/g, '_' );
  return `${prefix}_${timestamp}_${sanitizedName}`;
}

/**
 * Remove prefix from filename
 * @param {string} fileName - Filename with prefix
 * @param {string} prefix - Prefix to remove (e.g., 'CV')
 * @returns {string} - Clean filename
 */
export function removeFileNamePrefix( fileName, prefix = 'CV' ) {
  const prefixPattern = new RegExp( `^${prefix}_\\d+_` );
  return fileName.replace( prefixPattern, '' ) || fileName;
}

