/**
 * Default values for user profile
 */
export const DEFAULT_USER_VALUES = {
  title: 'Frontend Developer',
  greeting: 'Hello I\'m',
  bioParagraph: 'A passionate Frontend Developer with 4+ years of experience crafting high-performance web applications for international markets. Specialized in ReactJS, NextJS, and modern JavaScript frameworks, I focus on building scalable, responsive applications with seamless API integration and optimal user experiences. Currently working at NAB Innovation Centre Vietnam, I bring expertise in component-based architecture, performance optimization, and cross-functional team collaboration to deliver innovative digital solutions.',
  stats: {
    years: 4,
    projects: 8,
    technologies: 4,
    commits: 500
  },
  cvPath: '/assets/resume/CV_Frontend_LinHuaChung.pdf',
  socialLinks: []
};

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
    title: user.title || DEFAULT_USER_VALUES.title,
    greeting: user.greeting || DEFAULT_USER_VALUES.greeting,
    bioParagraph: user.bioParagraph || DEFAULT_USER_VALUES.bioParagraph,
    stats: user.stats || DEFAULT_USER_VALUES.stats,
    cvPath: user.cvPath || DEFAULT_USER_VALUES.cvPath,
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
    return existingStats || DEFAULT_USER_VALUES.stats;
  }

  const normalized = {};
  const statKeys = ['years', 'projects', 'technologies', 'commits'];

  statKeys.forEach( key => {
    const value = stats[key];
    // Since stats fields are required, if value is invalid, use existing or default
    if ( value === '' || value === null || value === undefined ) {
      normalized[key] = existingStats?.[key] ?? DEFAULT_USER_VALUES.stats[key];
    } else {
      const num = Number( value );
      // If conversion results in NaN, use existing or default
      if ( isNaN( num ) ) {
        normalized[key] = existingStats?.[key] ?? DEFAULT_USER_VALUES.stats[key];
      } else {
        // Ensure it's an integer and within reasonable bounds
        normalized[key] = Math.max( 0, Math.floor( num ) );
      }
    }
  } );

  return normalized;
}

