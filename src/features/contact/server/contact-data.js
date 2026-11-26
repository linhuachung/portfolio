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
  const fullName = body.name?.trim() || `${body.firstname || ''} ${body.lastname || ''}`.trim();
  const nameParts = fullName.split( /\s+/ ).filter( Boolean );
  const firstname = body.firstname?.trim() || nameParts[0] || '';
  const lastname = body.lastname?.trim() || nameParts.slice( 1 ).join( ' ' ) || '-';

  return {
    userId,
    firstname,
    lastname,
    name: fullName, // For backward compatibility
    email: body.email,
    phone: body.phone || null,
    service: body.service || null,
    message: body.message,
    status: 'pending'
  };
}
