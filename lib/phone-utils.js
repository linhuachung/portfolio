import { COUNTRY_CODES } from '@/constants/country-codes';

// Cache sorted country codes (by length, longest first) for better performance
// This prevents matching "+1" when the actual code is "+12"
let sortedCountryCodes = null;

function getSortedCountryCodes() {
  if ( !sortedCountryCodes ) {
    sortedCountryCodes = [...COUNTRY_CODES].sort( ( a, b ) => b.value.length - a.value.length );
  }
  return sortedCountryCodes;
}

/**
 * Parse phone number from stored format
 * Format: "countryCode|phoneNumber" or legacy formats like "+84 849966277"
 * @param {string} value - Phone value from database or form
 * @param {string} defaultCountryCode - Default country code if not found
 * @returns {Object} - { countryCode, phoneNumber }
 */
export function parsePhoneNumber( value, defaultCountryCode = '+84' ) {
  if ( !value ) {
    return { countryCode: defaultCountryCode, phoneNumber: '' };
  }

  if ( value.includes( '|' ) ) {
    const parts = value.split( '|' );
    return {
      countryCode: parts[0] || defaultCountryCode,
      phoneNumber: parts[1] || ''
    };
  }

  if ( value.startsWith( '+' ) ) {
    const sortedCodes = getSortedCountryCodes();
    const matchedCode = sortedCodes.find( code => value.startsWith( code.value ) );

    if ( matchedCode ) {
      return {
        countryCode: matchedCode.value,
        phoneNumber: value.replace( matchedCode.value, '' ).trim()
      };
    }
  }

  return {
    countryCode: defaultCountryCode,
    phoneNumber: value
  };
}

/**
 * Format phone number for storage
 * @param {string} countryCode - Country code (e.g., "+84")
 * @param {string} phoneNumber - Phone number
 * @returns {string} - Formatted phone string "countryCode|phoneNumber"
 */
export function formatPhoneForStorage( countryCode, phoneNumber ) {
  if ( !phoneNumber || !phoneNumber.trim() ) {
    return countryCode;
  }
  return `${countryCode}|${phoneNumber.trim()}`;
}

/**
 * Format phone number for display (e.g., in email)
 * @param {string} phoneValue - Phone value in storage format "countryCode|phoneNumber"
 * @returns {string} - Formatted phone string "countryCode phoneNumber"
 */
export function formatPhoneForDisplay( phoneValue ) {
  if ( !phoneValue ) {
    return '';
  }

  if ( phoneValue.includes( '|' ) ) {
    return phoneValue.replace( '|', ' ' );
  }

  return phoneValue;
}

/**
 * Sanitize phone number input (only allow numbers, spaces, parentheses, dashes)
 * @param {string} value - Raw input value
 * @returns {string} - Sanitized value
 */
export function sanitizePhoneInput( value ) {
  if ( !value ) {
    return '';
  }
  return value.replace( /[^\d\s()-]/g, '' );
}

/**
 * Validate phone number format
 * @param {string} phoneValue - Phone value in storage format
 * @returns {boolean} - True if valid
 */
export function isValidPhoneNumber( phoneValue ) {
  if ( !phoneValue ) {
    return false;
  }

  const { phoneNumber } = parsePhoneNumber( phoneValue );

  if ( !phoneNumber || !phoneNumber.trim() ) {
    return false;
  }

  // Allow numbers, spaces, parentheses, and dashes
  const isValidFormat = /^[\d\s()-]+$/.test( phoneNumber );
  const hasMinDigits = phoneNumber.replace( /\D/g, '' ).length >= 7;

  return isValidFormat && hasMinDigits;
}

