import { FILE_REGEX } from './regex-patterns';

/**
 * File upload constants
 */
export const FILE_UPLOAD = {
  CV: {
    MAX_SIZE_MB: 10,
    MAX_SIZE_BYTES: 10 * 1024 * 1024,
    ACCEPTED_TYPES: ['application/pdf'],
    ACCEPT_EXTENSION: '.pdf'
  },
  IMAGE: {
    MAX_SIZE_MB: 5,
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    ACCEPTED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
    ACCEPT_EXTENSIONS: ['.png', '.jpeg', '.jpg']
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
  const sanitizedName = originalName.replace( FILE_REGEX.SANITIZE_FILENAME, '_' );
  return `${prefix}_${timestamp}_${sanitizedName}`;
}

/**
 * Remove prefix from filename
 * @param {string} fileName - Filename with prefix
 * @param {string} prefix - Prefix to remove (e.g., 'CV')
 * @returns {string} - Clean filename
 */
export function removeFileNamePrefix( fileName, prefix = 'CV' ) {
  const prefixPattern = FILE_REGEX.FILENAME_PREFIX( prefix );
  return fileName.replace( prefixPattern, '' ) || fileName;
}

