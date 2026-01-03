'use client';

import { parsePhoneNumber } from '@/lib/phone-utils';
import { FaPhoneAlt } from 'react-icons/fa';

/**
 * Format phone number for display based on country code
 * @param {string} countryCode - Country code (e.g., "+84", "+1")
 * @param {string} phoneNumber - Phone number without country code
 * @returns {string} - Formatted phone number
 */
function formatPhoneByCountry( countryCode, phoneNumber ) {
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

export function PhoneDisplay( { phone, className = '', showIcon = true, iconClassName = '' } ) {
  if ( !phone ) {
    return null;
  }

  const { countryCode, phoneNumber } = parsePhoneNumber( phone );

  if ( !phoneNumber || !phoneNumber.trim() ) {
    return null;
  }

  const formattedPhone = formatPhoneByCountry( countryCode, phoneNumber );
  const displayPhone = formattedPhone ? `${countryCode} ${formattedPhone}` : `${countryCode} ${phoneNumber}`;

  // Create tel: link with only digits (remove country code + and spaces)
  const cleanPhoneNumber = phoneNumber.replace( /\D/g, '' );
  const cleanCountryCode = countryCode.replace( /[^\d]/g, '' );
  const telLink = `tel:${cleanCountryCode}${cleanPhoneNumber}`;

  return (
    <div className={ `flex items-center gap-6 ${className}` }>
      { showIcon && (
        <div
          className={ `w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center ${iconClassName}` }
        >
          <div className="text-[28px]">
            <FaPhoneAlt/>
          </div>
        </div>
      ) }
      <div className="flex-1">
        <p className="text-gray-600 dark:text-white/60">Phone</p>
        <a
          href={ telLink }
          className="text-lg text-gray-900 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all duration-300"
        >
          { displayPhone }
        </a>
      </div>
    </div>
  );
}

