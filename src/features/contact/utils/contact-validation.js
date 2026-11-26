export const contactServices = ['frontend', 'ui', 'performance', 'fullstack'];

export function validateContactPayload( input ) {
  const data = input && typeof input === 'object' ? input : {};
  const errors = {};
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const service = typeof data.service === 'string' ? data.service : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if ( name.length < 2 || name.length > 100 ) {errors.name = 'Enter your full name.';}
  if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email ) || email.length > 254 ) {errors.email = 'Enter a valid email address.';}
  if ( !contactServices.includes( service ) ) {errors.service = 'Choose a conversation topic.';}
  if ( message.length < 10 ) {errors.message = 'Tell me a little more (at least 10 characters).';}
  if ( message.length > 3000 ) {errors.message = 'Keep the message under 3,000 characters.';}

  return {
    valid: Object.keys( errors ).length === 0,
    errors,
    data: { name, email, service, message }
  };
}
