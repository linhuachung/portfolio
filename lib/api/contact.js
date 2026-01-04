import Toast from '@/components/Toast';
import STATUS_CODES from '@/constants/status';
import { TOAST_STATUS } from '@/constants/toast';

/**
 * Submit contact form via API
 * Saves to database and sends email notification via Resend
 * @param {Object} data - Contact form data
 * @param {string} data.firstname - First name
 * @param {string} data.lastname - Last name
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number (formatted)
 * @param {string} data.service - Service type
 * @param {string} data.message - Message content
 * @returns {Promise<Object>} - API response
 */
export async function submitContactForm( data ) {
  try {
    const response = await fetch( '/api/user/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( data )
    } );

    const result = await response.json();

    if ( !response.ok ) {
      // Handle validation errors
      if ( result.errors && Array.isArray( result.errors ) ) {
        const firstError = result.errors[0];
        throw new Error( firstError.message || 'Validation failed' );
      }
      throw new Error( result.message || 'Failed to submit contact form' );
    }

    if ( result.status === STATUS_CODES.SUCCESS ) {
      Toast( {
        title: 'Awesome! Your message is on its way. We\'ll reply as soon as possible. 😊',
        type: TOAST_STATUS.success,
        className: 'p-8'
      } );
    }

    return result;
  } catch ( error ) {
    console.error( 'Contact form submission error:', error );
    // Don't show Toast here - let FormContainer handle error display
    throw error;
  }
}

// Keep backward compatibility
export const EmailSubmit = submitContactForm;

