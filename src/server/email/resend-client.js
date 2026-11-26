import { Resend } from 'resend';

/**
 * Initialize Resend client
 * @returns {Resend} Resend client instance
 * @throws {Error} If RESEND_API_KEY is not configured
 */
export function getResendClient() {
  if ( !process.env.RESEND_API_KEY ) {
    throw new Error( 'RESEND_API_KEY is not configured' );
  }
  return new Resend( process.env.RESEND_API_KEY );
}

/**
 * Get Resend from email address
 * @returns {string} From email address
 * @throws {Error} If RESEND_FROM_EMAIL is not configured
 */
export function getResendFromEmail() {
  if ( !process.env.RESEND_FROM_EMAIL ) {
    throw new Error( 'RESEND_FROM_EMAIL is not configured in .env.local' );
  }
  return process.env.RESEND_FROM_EMAIL;
}

/**
 * Handle Resend API response and check for errors
 * @param {Object} result - Resend API response
 * @param {string} context - Context for logging (e.g., 'contact email', 'reply email')
 * @returns {Object} Result data
 * @throws {Error} If result contains error
 */
export function handleResendResponse( result, context = 'email' ) {
  if ( result.error ) {
    const errorMessage = result.error.message || 'Unknown error';
    const statusCode = result.error.statusCode || 500;

    // Enhanced error logging
    console.error( `❌ Resend API error (${context}):`, {
      statusCode,
      message: errorMessage,
      error: result.error,
      fullResult: result
    } );

    throw new Error( `Resend API error (${statusCode}): ${errorMessage}` );
  }

  // Log success
  if ( result.data?.id ) {
    // eslint-disable-next-line no-console
    console.log( `✅ ${context} sent successfully:`, {
      emailId: result.data.id,
      to: result.data.to
    } );
  }

  return result;
}

