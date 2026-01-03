/**
 * Format user data for API response
 * @param {Object} user - User object from database
 * @param {boolean} includePrivateFields - Include private fields like email, id
 * @returns {Object} - Formatted user data
 */
export function formatUserData( user, includePrivateFields = false ) {
  if ( !user ) {
    return null;
  }

  const baseData = {
    name: user.name,
    avatar: user.avatar,
    title: user.title,
    greeting: user.greeting,
    bioParagraph: user.bioParagraph,
    stats: user.stats,
    cvPath: user.cvPath,
    socialLinks: ( user.socialLinks || [] ).map( link => ( {
      id: link.id,
      type: link.type,
      url: link.url,
      order: link.order
    } ) )
  };

  if ( includePrivateFields ) {
    return {
      id: user.id,
      email: user.email,
      bio: user.bio,
      phone: user.phone,
      website: user.website,
      ...baseData
    };
  }

  return baseData;
}

/**
 * Convert empty strings to null for optional fields
 * @param {any} value - Value to convert
 * @param {any} existingValue - Existing value from database
 * @returns {any} - Converted value
 */
export function normalizeOptionalField( value, existingValue ) {
  if ( value === undefined ) {
    return existingValue;
  }
  return value === '' ? null : value;
}

/**
 * Normalize stats object - ensure numbers are valid (stats fields are now required)
 * @param {Object} stats - Stats object from form
 * @param {Object} existingStats - Existing stats from database
 * @returns {Object} - Normalized stats object
 */
export function normalizeStats( stats, existingStats ) {
  if ( !stats || typeof stats !== 'object' ) {
    return existingStats || { years: 0, projects: 0, technologies: 0, commits: 0 };
  }

  const normalized = {};
  const statKeys = ['years', 'projects', 'technologies', 'commits'];

  statKeys.forEach( key => {
    const value = stats[key];
    // If value is invalid, use existing or 0
    if ( value === '' || value === null || value === undefined ) {
      normalized[key] = existingStats?.[key] ?? 0;
    } else {
      const num = Number( value );
      // If conversion results in NaN, use existing or 0
      if ( isNaN( num ) ) {
        normalized[key] = existingStats?.[key] ?? 0;
      } else {
        // Ensure it's an integer and within reasonable bounds
        normalized[key] = Math.max( 0, Math.floor( num ) );
      }
    }
  } );

  return normalized;
}

