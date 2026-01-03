import { formatAddress } from '@/lib/address-utils';

/**
 * Fetch contact information from API
 * @param {boolean} includeContact - Whether to include contact fields
 * @returns {Promise<Object>} - Contact info object with phone, email, address
 */
export async function fetchContactInfo( includeContact = true ) {
  try {
    const response = await fetch( `/api/user/profile?includeContact=${includeContact}`, {
      cache: 'no-store'
    } );
    const result = await response.json();

    if ( result && result.status === 200 && result.data ) {
      const userData = result.data;
      const addressData = {
        address: userData.address,
        addressCity: userData.addressCity,
        addressCountry: userData.addressCountry
      };
      const formattedAddress = formatAddress( addressData );

      return {
        phone: userData.phone || '',
        email: userData.email || '',
        address: formattedAddress
      };
    }

    return {
      phone: '',
      email: '',
      address: ''
    };
  } catch ( error ) {
    console.error( 'Failed to fetch contact info:', error );
    return {
      phone: '',
      email: '',
      address: ''
    };
  }
}

/**
 * Format contact data for display
 * @param {Object} contactInfo - Contact info object
 * @param {string} contactInfo.phone - Phone number
 * @param {string} contactInfo.email - Email address
 * @param {string} contactInfo.address - Formatted address
 * @returns {Object} - Formatted contact info
 */
export function formatContactInfoForDisplay( contactInfo ) {
  const addressMapLink = 'https://maps.app.goo.gl/tLqFHdNkU8eeYoXx6';

  return {
    phone: contactInfo.phone || '',
    email: contactInfo.email || '',
    address: contactInfo.address || '',
    emailLink: contactInfo.email ? `mailto:${contactInfo.email}` : '',
    addressLink: addressMapLink
  };
}

