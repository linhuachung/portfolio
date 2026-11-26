const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,128}$/;

export function validatePasswordChange( input ) {
  const currentPassword = typeof input?.currentPassword === 'string' ? input.currentPassword : '';
  const newPassword = typeof input?.newPassword === 'string' ? input.newPassword : '';

  if ( !currentPassword ) {
    return { valid: false, field: 'currentPassword', message: 'Current password is required' };
  }
  if ( !STRONG_PASSWORD.test( newPassword ) ) {
    return { valid: false, field: 'newPassword', message: 'Use 12–128 characters with uppercase, lowercase, number, and symbol' };
  }
  if ( currentPassword === newPassword ) {
    return { valid: false, field: 'newPassword', message: 'New password must be different from the current password' };
  }

  return { valid: true, data: { currentPassword, newPassword } };
}
