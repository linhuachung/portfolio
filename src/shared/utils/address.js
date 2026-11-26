import { getCitiesByCountry } from '@/shared/constants/address-data';

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
