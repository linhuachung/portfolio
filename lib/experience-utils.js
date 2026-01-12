export function formatExperienceForDisplay( experience ) {
  if ( !experience ) {
    return null;
  }

  return {
    id: experience.id,
    company: experience.company || '',
    position: experience.position || '',
    description: experience.description || '',
    startDate: experience.startDate ? new Date( experience.startDate ).toISOString().split( 'T' )[0] : '',
    endDate: experience.endDate ? new Date( experience.endDate ).toISOString().split( 'T' )[0] : null,
    isCurrent: experience.isCurrent || false,
    location: experience.location || '',
    companyLogo: experience.companyLogo || null,
    companyWebsite: experience.companyWebsite || null,
    techStack: experience.techStack?.map( ( ts ) => ts.techStack?.name || ts.name || ts ) || []
  };
}

export function formatExperienceForForm( experience ) {
  if ( !experience ) {
    return {
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      companyLogo: '',
      companyWebsite: '',
      techStack: []
    };
  }

  return {
    company: experience.company || '',
    position: experience.position || '',
    description: experience.description || '',
    startDate: experience.startDate ? new Date( experience.startDate ).toISOString().split( 'T' )[0] : '',
    endDate: experience.endDate ? new Date( experience.endDate ).toISOString().split( 'T' )[0] : '',
    isCurrent: experience.isCurrent || false,
    location: experience.location || '',
    companyLogo: experience.companyLogo || '',
    companyWebsite: experience.companyWebsite || '',
    techStack: experience.techStack?.map( ( ts ) => ts.techStack?.name || ts.name || ts ) || []
  };
}

export function prepareExperienceForDB( data, userId, techStackNames = [] ) {
  const startDate = data.startDate ? new Date( data.startDate ) : null;
  const endDate = data.endDate && data.endDate.trim() !== '' ? new Date( data.endDate ) : null;

  return {
    userId,
    company: data.company?.trim() || '',
    position: data.position?.trim() || '',
    description: data.description?.trim() || '',
    startDate,
    endDate: data.isCurrent ? null : endDate,
    isCurrent: data.isCurrent || false,
    location: data.location?.trim() || '',
    companyLogo: data.companyLogo?.trim() || null,
    companyWebsite: data.companyWebsite?.trim() || null,
    techStackNames: Array.isArray( techStackNames ) ? techStackNames.filter( ( name ) => name && name.trim() !== '' ) : []
  };
}

export function normalizeOptionalField( value, existingValue ) {
  if ( value === undefined || value === null ) {
    return existingValue;
  }
  const trimmed = String( value ).trim();
  return trimmed === '' ? null : trimmed;
}

/**
 * Format date for timeline display (MM/YYYY format)
 * @param {string|Date} dateString - Date string in ISO format or Date object
 * @returns {string} Formatted date string (e.g., "03/2024") or empty string if invalid
 */
export function formatDateForTimeline( dateString ) {
  if ( !dateString ) {
    return '';
  }

  try {
    const date = new Date( dateString );
    if ( isNaN( date.getTime() ) ) {
      return '';
    }

    const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
    const year = date.getFullYear();
    return `${month}/${year}`;
  } catch ( error ) {
    console.error( 'Error formatting date for timeline:', error );
    return '';
  }
}

/**
 * Format date range for timeline display
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date (optional)
 * @param {boolean} isCurrent - Whether this is a current position
 * @returns {string} Formatted date range (e.g., "03/2024 - Present" or "03/2024 - 03/2025")
 */
export function formatDateRangeForTimeline( startDate, endDate, isCurrent = false ) {
  const formattedStart = formatDateForTimeline( startDate );
  if ( !formattedStart ) {
    return '';
  }

  if ( isCurrent ) {
    return `${formattedStart} - Present`;
  }

  const formattedEnd = formatDateForTimeline( endDate );
  if ( !formattedEnd ) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
}
