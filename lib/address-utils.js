import { COUNTRIES, getCitiesByCountry } from '@/constants/address-data';

/**
 * Get country label from value
 * @param {string} countryValue - Country value (e.g., 'vietnam', 'usa')
 * @returns {string} - Country label or original value if not found
 */
export function getCountryLabel( countryValue ) {
  if ( !countryValue ) {return '';}
  const country = COUNTRIES.find( c => c.value === countryValue );
  return country?.label || countryValue;
}

/**
 * Get city label from value
 * @param {string} cityValue - City value (e.g., 'ho-chi-minh', 'hanoi')
 * @param {string} countryValue - Country value (e.g., 'vietnam')
 * @returns {string} - City label or original value if not found
 */
export function getCityLabel( cityValue, countryValue ) {
  if ( !cityValue ) {return '';}
  if ( !countryValue ) {return cityValue;}

  const cities = getCitiesByCountry( countryValue );
  const city = cities.find( c => c.value === cityValue );
  return city?.label || cityValue;
}

/**
 * Format address for display
 * @param {Object} addressData - Address data object
 * @param {string} addressData.address - Street address
 * @param {string} addressData.addressCity - City value
 * @param {string} addressData.addressCountry - Country value
 * @returns {string} - Formatted address string
 */
export function formatAddress( addressData ) {
  if ( !addressData ) {return '';}

  const { address, addressCity, addressCountry } = addressData;
  const parts = [];

  if ( address && address.trim() ) {
    parts.push( address.trim() );
  }

  if ( addressCity ) {
    const cityLabel = getCityLabel( addressCity, addressCountry );
    if ( cityLabel && cityLabel !== 'Other' ) {
      parts.push( cityLabel );
    }
  }

  if ( addressCountry ) {
    const countryLabel = getCountryLabel( addressCountry );
    if ( countryLabel && countryLabel !== 'Other' ) {
      parts.push( countryLabel );
    }
  }

  return parts.join( ', ' ) || '';
}

/**
 * Validate city belongs to country
 * @param {string} city - City value
 * @param {string} country - Country value
 * @returns {{valid: boolean, error?: string}}
 */
export function validateCityForCountry( city, country ) {
  if ( !country || country.trim() === '' ) {
    return { valid: true }; // Country is optional, so city can be empty
  }

  if ( !city || city.trim() === '' ) {
    return { valid: true }; // City is optional
  }

  const availableCities = getCitiesByCountry( country );
  const cityExists = availableCities.some( c => c.value === city );

  if ( !cityExists ) {
    return {
      valid: false,
      error: 'Selected city does not belong to the selected country'
    };
  }

  return { valid: true };
}

/**
 * Check if address data is complete
 * @param {Object} addressData - Address data object
 * @returns {boolean} - True if at least one field is filled
 */
export function hasAddressData( addressData ) {
  if ( !addressData ) {return false;}
  return !!(
    ( addressData.address && addressData.address.trim() ) ||
    addressData.addressCity ||
    addressData.addressCountry
  );
}

