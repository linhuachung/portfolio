import prismadb from '@/server/db';
import { HttpError } from '@/server/http';
import { withTimeout } from '@/server/utils';
import STATUS_CODES from '@/shared/constants/status';
import { prepareSocialLinksForDB } from '../utils/social-links';
import { formatUserData, normalizeOptionalField, normalizeStats } from './user-formatter';

const DATABASE_TIMEOUT_MS = 3500;
const WITH_SOCIAL_LINKS = { socialLinks: { orderBy: { order: 'asc' } } };
const OPTIONAL_FIELDS = ['avatar', 'bio', 'phone', 'title', 'greeting', 'bioParagraph', 'cvPath', 'addressCountry', 'addressCity', 'address'];
const CONTACT_FIELDS = ['email', 'phone', 'addressCountry', 'addressCity', 'address'];

// The portfolio has a single owner record.
async function findOwner( options ) {
  const owner = await prismadb.user.findFirst( options );
  if ( !owner ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'User not found' );}
  return owner;
}

/** Full profile for the admin editor, private fields included. */
export async function getAdminProfile() {
  const owner = await withTimeout( findOwner( { include: WITH_SOCIAL_LINKS } ), DATABASE_TIMEOUT_MS );
  return formatUserData( owner, true );
}

/** Public profile for the site header and contact page; contact details only when asked for. */
export async function getPublicProfile( { includeContact = false } = {} ) {
  const owner = await findOwner( { include: WITH_SOCIAL_LINKS } );
  const profile = formatUserData( owner, false );
  if ( includeContact ) {
    for ( const field of CONTACT_FIELDS ) {profile[field] = owner[field] || null;}
  }
  profile.socialLinks = profile.socialLinks.filter( link => link.url && link.url.trim() !== '' );
  return profile;
}

/**
 * Updates the owner profile. Omitted fields keep their value, empty strings
 * clear optional fields, and `socialLinks` (when an array) replaces the list.
 */
export async function updateAdminProfile( body ) {
  const owner = await findOwner();
  const data = {
    email: body.email || owner.email,
    name: body.name || owner.name,
    stats: body.stats !== undefined ? normalizeStats( body.stats, owner.stats ) : owner.stats
  };
  for ( const field of OPTIONAL_FIELDS ) {data[field] = normalizeOptionalField( body[field], owner[field] );}

  await prismadb.user.update( { where: { id: owner.id }, data } );

  if ( Array.isArray( body.socialLinks ) ) {
    await prismadb.socialLink.deleteMany( { where: { userId: owner.id } } );
    const links = prepareSocialLinksForDB( body.socialLinks, owner.id );
    if ( links.length > 0 ) {await prismadb.socialLink.createMany( { data: links } );}
  }

  const updated = await prismadb.user.findUnique( { where: { id: owner.id }, include: WITH_SOCIAL_LINKS } );
  return formatUserData( updated, true );
}
