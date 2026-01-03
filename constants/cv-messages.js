/**
 * CV-related error messages and codes
 */
export const CV_MESSAGES = {
  NOT_AVAILABLE: 'CV not available. Please upload a CV file in the admin panel.',
  OUTDATED_PATH: 'CV file path is outdated. Please upload a new CV file in the admin panel.',
  INVALID_PATH: 'Invalid CV file path. Please upload a new CV file in the admin panel.',
  DOWNLOAD_FAILED: 'Failed to download CV. Please try again later.',
  FETCH_FAILED: 'Failed to fetch CV file.',
  DOWNLOAD_SUCCESS: 'CV downloaded successfully!',
  DOWNLOAD_TIMEOUT: 'Download timeout. Please try again.'
};

/**
 * Upload-related messages
 */
export const UPLOAD_MESSAGES = {
  CV_SUCCESS: 'File uploaded successfully',
  IMAGE_SUCCESS: 'Image uploaded successfully',
  UPLOAD_FAILED: 'Failed to upload file',
  NO_FILE: 'No file provided',
  INVALID_FILENAME: 'Invalid file name',
  DANGEROUS_CHARS: 'File name contains invalid characters',
  INVALID_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  EMPTY_FILE: 'File is empty or corrupted',
  S3_NOT_CONFIGURED: 'AWS S3 is not configured. Please set AWS_S3_BUCKET_NAME in environment variables.'
};

export const CV_ERROR_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  OUTDATED_PATH: 'OUTDATED_PATH',
  INVALID_PATH: 'INVALID_PATH'
};

export const CV_CONSTANTS = {
  DOWNLOAD_DELAY_MS: 100,
  DOWNLOAD_TIMEOUT_MS: 30000,
  ERROR_TEXT_MAX_LENGTH: 100,
  TRACKING_DELAY_MS: 100
};

