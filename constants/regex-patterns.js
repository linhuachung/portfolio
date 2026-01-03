/**
 * Centralized regex patterns for the application
 * All regex patterns should be defined here for better maintainability and reusability
 */

/**
 * Regex patterns for file validation and sanitization
 */
export const FILE_REGEX = {
  /**
   * Dangerous characters that should not be allowed in filenames
   * Matches: < > : " | ? * and control characters (ASCII 0-31)
   * Note: Using character class to avoid linter issues with control characters
   */
  DANGEROUS_CHARS: (() => {
    // Build regex pattern for control characters (ASCII 0-31)
    // Escape special regex characters
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const controlChars = Array.from({ length: 32 }, (_, i) => {
      const char = String.fromCharCode(i);
      return escapeRegex(char);
    }).join('');
    return new RegExp(`[<>:"|?*${controlChars}]`);
  })(),

  /**
   * Sanitize filename - keep only alphanumeric, dots, and hyphens
   * Replaces all other characters with underscore
   */
  SANITIZE_FILENAME: /[^a-zA-Z0-9.-]/g,

  /**
   * Pattern to match filename prefix with timestamp
   * Format: {prefix}_{timestamp}_
   * Example: CV_1234567890_filename.pdf
   */
  FILENAME_PREFIX: ( prefix = 'CV' ) => new RegExp( `^${prefix}_\\d+_` ),

  /**
   * Pattern to match trailing slash at end of string
   */
  TRAILING_SLASH: /\/$/
};

/**
 * Regex patterns for URL validation
 */
export const URL_REGEX = {
  /**
   * Match HTTP or HTTPS protocol
   */
  HTTP_PROTOCOL: /^https?:\/\//i,

  /**
   * Match valid URL format
   */
  VALID_URL: /^https?:\/\/.+/i
};

/**
 * Regex patterns for CV path validation
 */
export const CV_PATH_REGEX = {
  /**
   * Match outdated local asset paths
   */
  OUTDATED_LOCAL_PATH: /^\/assets\/(resume\/)?/,

  /**
   * Match valid HTTP/HTTPS URLs
   */
  VALID_URL: /^https?:\/\//
};

