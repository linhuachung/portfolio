import prismadb from '@/server/db';
import { HttpError } from '@/server/http';
import STATUS_CODES from '@/shared/constants/status';
import { buildAdminContactWhere } from './contact-query';
import { REPLY_SELECT } from './contact-replies';

export const CONTACT_STATUSES = ['pending', 'read', 'replied', 'archived'];

// Every response that returns a contact to the detail view includes its replies,
// because the client replaces its copy of the contact with the response.
const CONTACT_DETAIL_SELECT = {
  id: true,
  firstname: true,
  lastname: true,
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
  status: true,
  reply: true,
  repliedAt: true,
  emailOpenedAt: true,
  createdAt: true,
  replies: { orderBy: { createdAt: 'desc' }, select: REPLY_SELECT }
};

const displayName = ( contact ) => contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim() || 'Unknown contact';

/** One page of the inbox plus per-status counts for the filter tabs. */
export async function listContacts( filters ) {
  const where = buildAdminContactWhere( filters );
  const [items, total, statusGroups] = await Promise.all( [
    prismadb.contact.findMany( {
      where,
      skip: ( filters.page - 1 ) * filters.limit,
      take: filters.limit,
      orderBy: { createdAt: filters.sort === 'oldest' ? 'asc' : 'desc' },
      select: {
        id: true, name: true, firstname: true, lastname: true, email: true, service: true,
        message: true, status: true, createdAt: true, _count: { select: { replies: true } }
      }
    } ),
    prismadb.contact.count( { where } ),
    prismadb.contact.groupBy( { by: ['status'], _count: { id: true } } )
  ] );

  const counts = Object.fromEntries( statusGroups.map( group => [group.status, group._count.id] ) );
  return {
    items: items.map( ( { _count, ...item } ) => ( { ...item, name: displayName( item ), replyCount: _count.replies } ) ),
    counts: { all: Object.values( counts ).reduce( ( sum, count ) => sum + count, 0 ), ...counts },
    pagination: { page: filters.page, limit: filters.limit, total, pages: Math.max( 1, Math.ceil( total / filters.limit ) ) }
  };
}

/** Unread count and latest message, polled by the admin navigation badge. */
export async function getInboxSummary() {
  const [unread, total, latest] = await Promise.all( [
    prismadb.contact.count( { where: { status: 'pending' } } ),
    prismadb.contact.count(),
    prismadb.contact.findFirst( { orderBy: { createdAt: 'desc' }, select: { id: true, createdAt: true, status: true } } )
  ] );
  return { unread, total, latest };
}

export async function getContactDetail( id ) {
  const contact = await prismadb.contact.findUnique( { where: { id }, select: CONTACT_DETAIL_SELECT } );
  if ( !contact ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Contact not found' );}
  return contact;
}

/** Applies `{ status?, reply? }`. Setting a reply also marks the contact replied unless a status is given. */
function toContactUpdate( body ) {
  if ( !body || typeof body !== 'object' ) {throw new HttpError( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );}
  if ( body.status && !CONTACT_STATUSES.includes( body.status ) ) {
    throw new HttpError( STATUS_CODES.BAD_REQUEST, `Invalid status. Must be one of: ${CONTACT_STATUSES.join( ', ' )}` );
  }

  const data = {};
  if ( body.status ) {data.status = body.status;}
  if ( body.reply !== undefined ) {
    data.reply = body.reply || null;
    data.repliedAt = body.reply ? new Date() : null;
    if ( body.reply && !body.status ) {data.status = 'replied';}
  }
  return data;
}

export async function updateContact( id, body ) {
  try {
    return await prismadb.contact.update( { where: { id }, data: toContactUpdate( body ), select: CONTACT_DETAIL_SELECT } );
  } catch ( error ) {
    if ( error.code === 'P2025' ) {throw new HttpError( STATUS_CODES.NOT_FOUND, 'Contact not found' );}
    throw error;
  }
}
