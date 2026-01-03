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
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  UPLOAD_FAILED: 'Failed to upload file',
  DOWNLOAD_TIMEOUT: 'Download timeout. Please try again.'
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

