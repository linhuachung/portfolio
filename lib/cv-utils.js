import { removeFileNamePrefix } from '@/constants/file-upload';
import { CV_PATH_REGEX } from '@/constants/regex-patterns';

/**
 * Validate CV path format
 * @param {string} cvPath - CV path to validate
 * @returns {{valid: boolean, error?: string, code?: string}}
 */
export function validateCvPath( cvPath ) {
  if ( !cvPath ) {
    return {
      valid: false,
      error: 'CV not available. Please upload a CV file in the admin panel.',
      code: 'NOT_FOUND'
    };
  }

  if ( CV_PATH_REGEX.OUTDATED_LOCAL_PATH.test( cvPath ) ) {
    return {
      valid: false,
      error: 'CV file path is outdated. Please upload a new CV file in the admin panel.',
      code: 'OUTDATED_PATH'
    };
  }

  if ( !CV_PATH_REGEX.VALID_URL.test( cvPath ) ) {
    return {
      valid: false,
      error: 'Invalid CV file path. Please upload a new CV file in the admin panel.',
      code: 'INVALID_PATH'
    };
  }

  return { valid: true };
}

/**
 * Extract filename from URL
 * @param {string} url - URL to extract filename from
 * @param {string} defaultName - Default filename if extraction fails
 * @returns {string} - Extracted filename
 */
export function extractFileNameFromUrl( url, defaultName = 'CV.pdf' ) {
  if ( !url ) {return defaultName;}

  try {
    const urlObj = new URL( url );
    const pathname = urlObj.pathname;
    const urlParts = pathname.split( '/' );
    return urlParts[urlParts.length - 1] || defaultName;
  } catch {
    // Fallback to simple split if URL parsing fails
    const urlParts = url.split( '/' );
    return urlParts[urlParts.length - 1] || defaultName;
  }
}

/**
 * Get clean filename from CV URL (removes prefix)
 * @param {string} cvUrl - CV URL
 * @param {string} prefix - Prefix to remove (default: 'CV')
 * @param {string} defaultName - Default filename if extraction fails
 * @returns {string} - Clean filename
 */
export function getCleanCvFileName( cvUrl, prefix = 'CV', defaultName = 'CV.pdf' ) {
  const fileName = extractFileNameFromUrl( cvUrl, defaultName );
  return removeFileNamePrefix( fileName, prefix ) || defaultName;
}

