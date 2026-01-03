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

/**
 * Format phone number for display based on country code
 * @param {string} countryCode - Country code (e.g., "+84", "+1")
 * @param {string} phoneNumber - Phone number without country code
 * @returns {string} - Formatted phone number
 */
export function formatPhoneByCountry( countryCode, phoneNumber ) {
  if ( !phoneNumber ) {
    return '';
  }

  // Remove all non-digit characters
  const digits = phoneNumber.replace( /\D/g, '' );

  // Format based on country code
  switch ( countryCode ) {
    case '+84': { // Vietnam
      // Remove leading 0 if present (domestic format)
      const cleanDigits = digits.startsWith( '0' ) ? digits.slice( 1 ) : digits;

      if ( cleanDigits.length === 9 ) {
        // Format: 849 966 277 (mobile: 9 digits)
        return `${cleanDigits.slice( 0, 3 )} ${cleanDigits.slice( 3, 6 )} ${cleanDigits.slice( 6 )}`;
      } else if ( cleanDigits.length === 10 ) {
        // Format: 849 966 2777 (landline: 10 digits)
        return `${cleanDigits.slice( 0, 3 )} ${cleanDigits.slice( 3, 6 )} ${cleanDigits.slice( 6 )}`;
      } else if ( digits.length === 10 && digits.startsWith( '0' ) ) {
        // Format: 0849 966 277 (with leading 0)
        return `${digits.slice( 0, 4 )} ${digits.slice( 4, 7 )} ${digits.slice( 7 )}`;
      }
      // Fallback: group by 3 digits
      return digits.match( /.{1,3}/g )?.join( ' ' ) || digits;
    }

    case '+1': // USA/Canada
      if ( digits.length === 10 ) {
        // Format: (849) 966-2777
        return `(${digits.slice( 0, 3 )}) ${digits.slice( 3, 6 )}-${digits.slice( 6 )}`;
      }
      return digits.match( /.{1,3}/g )?.join( '-' ) || digits;

    case '+44': // UK
      if ( digits.length >= 10 ) {
        // Format: 0849 966 2777
        return `${digits.slice( 0, 4 )} ${digits.slice( 4, 7 )} ${digits.slice( 7 )}`;
      }
      return digits.match( /.{1,4}/g )?.join( ' ' ) || digits;

    case '+33': // France
      if ( digits.length === 9 ) {
        // Format: 8 49 96 62 77
        return digits.match( /.{1,2}/g )?.join( ' ' ) || digits;
      }
      // Fallback for other lengths
      return digits.match( /.{1,2}/g )?.join( ' ' ) || digits;

    case '+49': // Germany
      if ( digits.length >= 10 ) {
        // Format: 0849 9662777
        return `${digits.slice( 0, 4 )} ${digits.slice( 4 )}`;
      }
      return digits.match( /.{1,4}/g )?.join( ' ' ) || digits;

    case '+81': // Japan
      if ( digits.length === 10 ) {
        // Format: 084-9966-2777
        return `${digits.slice( 0, 3 )}-${digits.slice( 3, 7 )}-${digits.slice( 7 )}`;
      }
      return digits.match( /.{1,4}/g )?.join( '-' ) || digits;

    case '+86': // China
      if ( digits.length === 11 ) {
        // Format: 138 0013 8000
        return `${digits.slice( 0, 3 )} ${digits.slice( 3, 7 )} ${digits.slice( 7 )}`;
      }
      return digits.match( /.{1,4}/g )?.join( ' ' ) || digits;

    default:
      // Default formatting: group by 3-4 digits
      if ( digits.length <= 7 ) {
        return digits.match( /.{1,3}/g )?.join( ' ' ) || digits;
      } else {
        return `${digits.slice( 0, 3 )} ${digits.slice( 3, 6 )} ${digits.slice( 6 )}`;
      }
  }
}

/**
 * Generate tel: link from phone number
 * @param {string} phoneValue - Phone value in storage format
 * @returns {string} - tel: link (e.g., "tel:849966277")
 */
export function generateTelLink( phoneValue ) {
  if ( !phoneValue ) {
    return '';
  }

  const { countryCode, phoneNumber } = parsePhoneNumber( phoneValue );

  if ( !phoneNumber || !phoneNumber.trim() ) {
    return '';
  }

  // Create tel: link with only digits (remove country code + and spaces)
  const cleanPhoneNumber = phoneNumber.replace( /\D/g, '' );
  const cleanCountryCode = countryCode.replace( /[^\d]/g, '' );

  return `tel:${cleanCountryCode}${cleanPhoneNumber}`;
}

/**
 * Format phone number for display with country code
 * @param {string} phoneValue - Phone value in storage format
 * @returns {string} - Formatted phone string (e.g., "+84 849 966 277")
 */
export function formatPhoneForDisplayWithCountry( phoneValue ) {
  if ( !phoneValue ) {
    return '';
  }

  const { countryCode, phoneNumber } = parsePhoneNumber( phoneValue );

  if ( !phoneNumber || !phoneNumber.trim() ) {
    return '';
  }

  const formattedPhone = formatPhoneByCountry( countryCode, phoneNumber );
  return formattedPhone ? `${countryCode} ${formattedPhone}` : `${countryCode} ${phoneNumber}`;
}

