const CONTACT_STATUSES = new Set( ['all', 'pending', 'read', 'replied', 'archived'] );
const SORT_VALUES = new Set( ['newest', 'oldest'] );

const toPositiveInteger = ( value, fallback ) => {
  const parsed = Number.parseInt( value, 10 );
  return Number.isInteger( parsed ) && parsed > 0 ? parsed : fallback;
};

export function parseAdminContactQuery( searchParams ) {
  const requestedStatus = searchParams.get( 'status' ) || 'all';
  const requestedSort = searchParams.get( 'sort' ) || 'newest';
  const requestedLimit = toPositiveInteger( searchParams.get( 'limit' ), 15 );

  return {
    status: CONTACT_STATUSES.has( requestedStatus ) ? requestedStatus : 'all',
    query: ( searchParams.get( 'q' ) || '' ).trim().slice( 0, 100 ),
    page: toPositiveInteger( searchParams.get( 'page' ), 1 ),
    limit: [10, 15, 20, 25].includes( requestedLimit ) ? requestedLimit : 25,
    sort: SORT_VALUES.has( requestedSort ) ? requestedSort : 'newest'
  };
}

export function buildAdminContactWhere( { status, query } ) {
  const where = {};
  if ( status !== 'all' ) {
    where.status = status;
  }
  if ( query ) {
    where.OR = [
      { name: { contains: query } },
      { email: { contains: query } },
      { service: { contains: query } },
      { message: { contains: query } }
    ];
  }
  return where;
}
