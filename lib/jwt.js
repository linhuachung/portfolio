import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || SECRET_KEY;

/**
 * Generate access token (short-lived, 1 hour)
 */
export function generateToken( user ) {
  return jwt.sign( { id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' } );
}

/**
 * Generate refresh token (long-lived, 7 days)
 */
export function generateRefreshToken( user ) {
  return jwt.sign( { id: user.id, username: user.username }, REFRESH_SECRET_KEY, { expiresIn: '7d' } );
}

export function verifyToken( token ) {
  if ( !SECRET_KEY ) {
    return null;
  }

  if ( !token ) {
    return null;
  }

  try {
    return jwt.verify( token, SECRET_KEY );
  } catch ( error ) {
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken( token ) {
  if ( !REFRESH_SECRET_KEY ) {
    return null;
  }

  if ( !token ) {
    return null;
  }

  try {
    return jwt.verify( token, REFRESH_SECRET_KEY );
  } catch ( error ) {
    return null;
  }
}