/**
 * Email utility functions
 */

/**
 * Get base URL for the application
 * @returns {string} Base URL
 */
export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL ||
    ( process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.chunglh.com' );
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
export function isValidEmailFormat( email ) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test( email );
}

/**
 * Validate MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId format
 */
export function isValidObjectId( id ) {
  return id && /^[0-9a-fA-F]{24}$/.test( id );
}

/**
 * Sanitize HTML content by escaping special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
export function escapeHtml( text ) {
  if ( !text ) {
    return '';
  }
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };
  return text.replace( /[&<>"']/g, m => map[m] );
}

/**
 * Convert newlines to HTML line breaks
 * @param {string} text - Text to convert
 * @param {boolean} shouldEscape - Whether to escape HTML first
 * @returns {string} HTML with line breaks
 */
export function convertNewlinesToBr( text, shouldEscape = true ) {
  if ( !text ) {
    return '';
  }
  const escaped = shouldEscape ? escapeHtml( text ) : text;
  return escaped.replace( /\n/g, '<br>' );
}

/**
 * Format message for HTML email (escape and convert newlines)
 * @param {string} message - Message text
 * @returns {string} Formatted HTML
 */
export function formatMessageForHtml( message ) {
  if ( !message ) {
    return '';
  }
  return escapeHtml( message ).replace( /\n/g, '<br>' );
}

