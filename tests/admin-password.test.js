import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePasswordChange } from '../lib/admin-password.js';

test( 'password change rejects incomplete and weak input', () => {
  assert.deepEqual( validatePasswordChange( {} ), { valid: false, field: 'currentPassword', message: 'Current password is required' } );
  assert.equal( validatePasswordChange( { currentPassword: 'old', newPassword: 'short' } ).field, 'newPassword' );
  assert.equal( validatePasswordChange( { currentPassword: 'SamePassword1!', newPassword: 'SamePassword1!' } ).field, 'newPassword' );
} );

test( 'password change accepts a distinct strong password', () => {
  assert.deepEqual( validatePasswordChange( {
    currentPassword: 'CurrentPassword1!',
    newPassword: 'NewPortfolioPassword2!'
  } ), { valid: true, data: { currentPassword: 'CurrentPassword1!', newPassword: 'NewPortfolioPassword2!' } } );
} );
