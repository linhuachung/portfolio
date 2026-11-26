export function buildOverviewContent( {
  experiences = [],
  education = [],
  projects = [],
  skills = [],
  pendingContacts = 0
} ) {
  const mediaReviewCount = projects.filter( project => project.media?.permission === 'needs-review' ).length;
  const missingCredentials = education.reduce( ( count, item ) => (
    count + ( item.programs || [] ).filter( program => !program.credential ).length
  ), 0 );
  const currentRoles = experiences.filter( item => item.dates?.includes( 'Present' ) ).length;
  const skillCount = skills.reduce( ( count, group ) => count + ( group.items?.length || 0 ), 0 );

  const actionQueue = [];
  if ( pendingContacts > 0 ) {
    actionQueue.push( {
      id: 'pending-inbox',
      type: 'inbox',
      severity: 'high',
      count: pendingContacts,
      title: `${pendingContacts} new ${pendingContacts === 1 ? 'inquiry' : 'inquiries'}`,
      detail: 'Review and respond while the conversation is still fresh.',
      href: '/admin/contact?status=pending',
      actionLabel: 'Open Inbox'
    } );
  }
  if ( mediaReviewCount > 0 ) {
    actionQueue.push( {
      id: 'media-review',
      type: 'content',
      severity: 'medium',
      count: mediaReviewCount,
      title: `${mediaReviewCount} media ${mediaReviewCount === 1 ? 'item needs' : 'items need'} review`,
      detail: 'Confirm publication permission before using these assets as product evidence.',
      href: '/admin/project',
      actionLabel: 'Review Projects'
    } );
  }
  if ( missingCredentials > 0 ) {
    actionQueue.push( {
      id: 'missing-credentials',
      type: 'content',
      severity: 'medium',
      count: missingCredentials,
      title: `${missingCredentials} missing ${missingCredentials === 1 ? 'credential' : 'credentials'}`,
      detail: 'Attach evidence or mark the education record as intentionally private.',
      href: '/admin/education',
      actionLabel: 'Review Education'
    } );
  }

  return {
    stats: {
      publishedProjects: projects.length,
      pendingContacts,
      totalExperiences: experiences.length,
      totalEducation: education.length
    },
    actionQueue,
    contentSummary: {
      experience: { total: experiences.length, detail: `${currentRoles} current role`, status: 'ready', issues: 0 },
      projects: { total: projects.length, detail: `${mediaReviewCount} media items need review`, status: mediaReviewCount ? 'attention' : 'ready', issues: mediaReviewCount },
      education: { total: education.length, detail: `${missingCredentials} credentials missing`, status: missingCredentials ? 'attention' : 'ready', issues: missingCredentials },
      skills: { total: skillCount, detail: `${skills.length} capability groups`, status: skillCount ? 'ready' : 'attention', issues: skillCount ? 0 : 1 }
    }
  };
}

export function buildAudienceSummary( {
  visits = [],
  downloads = [],
  databaseAvailable = true
} ) {
  if ( !databaseAvailable ) {
    return {
      visits: null,
      downloads: null,
      downloadsPerHundredVisits: null
    };
  }

  const visitCount = visits.reduce( ( total, item ) => total + Number( item.count || 0 ), 0 );
  const downloadCount = downloads.reduce( ( total, item ) => total + Number( item.count || 0 ), 0 );

  return {
    visits: visitCount,
    downloads: downloadCount,
    downloadsPerHundredVisits: visitCount > 0
      ? Math.round( ( downloadCount / visitCount ) * 1000 ) / 10
      : null
  };
}

const shortDateFormatter = new Intl.DateTimeFormat( 'en-US', {
  timeZone: 'UTC',
  month: 'short',
  day: 'numeric'
} );

function startOfUtcWeek( date ) {
  const weekStart = new Date( date );
  weekStart.setUTCHours( 0, 0, 0, 0 );
  const daysSinceMonday = ( weekStart.getUTCDay() + 6 ) % 7;
  weekStart.setUTCDate( weekStart.getUTCDate() - daysSinceMonday );
  return weekStart;
}

export function formatChartData( data = [], period = 'month' ) {
  const grouped = new Map();

  data.forEach( item => {
    const date = new Date( item?.createdAt );
    if ( Number.isNaN( date.getTime() ) ) {return;}

    let key;
    let label;
    let sortValue;

    if ( period === 'day' ) {
      key = date.toISOString().slice( 0, 10 );
      label = key;
      sortValue = Date.parse( `${key}T00:00:00.000Z` );
    } else if ( period === 'week' ) {
      const weekStart = startOfUtcWeek( date );
      key = weekStart.toISOString().slice( 0, 10 );
      label = shortDateFormatter.format( weekStart );
      sortValue = weekStart.getTime();
    } else if ( period === 'year' ) {
      key = String( date.getUTCFullYear() );
      label = key;
      sortValue = Date.UTC( date.getUTCFullYear(), 0, 1 );
    } else {
      key = `${date.getUTCFullYear()}-${String( date.getUTCMonth() + 1 ).padStart( 2, '0' )}`;
      label = key;
      sortValue = Date.UTC( date.getUTCFullYear(), date.getUTCMonth(), 1 );
    }

    const existing = grouped.get( key );
    grouped.set( key, {
      date: label,
      count: ( existing?.count || 0 ) + 1,
      sortValue
    } );
  } );

  return [...grouped.values()]
    .sort( ( a, b ) => a.sortValue - b.sortValue )
    .map( ( { date, count } ) => ( { date, count } ) );
}

export function toRecentContact( contact ) {
  const rawName = contact?.name || `${contact?.firstname || ''} ${contact?.lastname || ''}`;
  const name = rawName.trim() || 'Unknown contact';
  const message = String( contact?.message || '' ).trim();
  const boundedMessage = message.length > 180
    ? `${message.slice( 0, 179 ).trimEnd()}…`
    : message;

  return {
    id: contact?.id,
    name,
    service: contact?.service || '',
    message: boundedMessage,
    status: contact?.status || 'pending',
    createdAt: contact?.createdAt
  };
}
