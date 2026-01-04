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

/**
 * Prepare contact data for database storage
 * @param {Object} body - Request body from contact form
 * @param {string} body.firstname - First name
 * @param {string} body.lastname - Last name
 * @param {string} body.email - Email address
 * @param {string} body.phone - Phone number (optional)
 * @param {string} body.service - Service type (optional)
 * @param {string} body.message - Message content
 * @param {string} userId - User ID to link the contact
 * @returns {Object} Contact data object ready for database
 */
export function prepareContactData( body, userId ) {
  const fullName = `${body.firstname} ${body.lastname}`.trim();

  return {
    userId,
    firstname: body.firstname,
    lastname: body.lastname,
    name: fullName, // For backward compatibility
    email: body.email,
    phone: body.phone || null,
    service: body.service || null,
    message: body.message,
    status: 'pending'
  };
}
