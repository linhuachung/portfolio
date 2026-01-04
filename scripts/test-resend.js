/**
 * Test Resend email service
 * Run: node scripts/test-resend.js
 */

import { Resend } from 'resend';

const resend = new Resend( 're_X2tKWRph_LK8K6FrPFmKs8RLq9b6hFK6q' );

async function testResend() {
  try {
    const result = await resend.emails.send( {
      from: 'onboarding@resend.dev',
      to: 'chunglh1304@gmail.com',
      subject: 'Hello World - Test from Portfolio',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p><p>This is a test email from your portfolio contact form system.</p>'
    } );

    console.log( '✅ Email sent successfully!' );
    console.log( 'Result:', result );
  } catch ( error ) {
    console.error( '❌ Failed to send email:', error );
  }
}

testResend();

