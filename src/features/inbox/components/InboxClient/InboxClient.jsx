'use client';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axiosInstance from '@/shared/api/http-client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ContactDetailModal from '../ContactDetailModal';
import { StatusBadge } from '@/features/admin-shell/styles/Admin.styles';
import {
  EmptyInbox,
  InboxCount,
  InboxFooter,
  InboxList,
  InboxMeta,
  InboxNotice,
  InboxRow,
  InboxToolbar,
  MessagePreview,
  Sender,
  StatusRail
} from './Inbox.styles';

const statusOptions = ['all', 'pending', 'read', 'replied', 'archived'];
const dateFormatter = new Intl.DateTimeFormat( 'en', { month: 'short', day: 'numeric', year: 'numeric' } );

export default function InboxClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = statusOptions.includes( searchParams.get( 'status' ) ) ? searchParams.get( 'status' ) : 'all';
  const sort = searchParams.get( 'sort' ) === 'oldest' ? 'oldest' : 'newest';
  const page = Math.max( 1, Number.parseInt( searchParams.get( 'page' ) || '1', 10 ) || 1 );
  const query = searchParams.get( 'q' ) || '';
  const [draftQuery, setDraftQuery] = useState( query );
  const [payload, setPayload] = useState( null );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( '' );
  const selectedContactId = /^[a-f\d]{24}$/i.test( searchParams.get( 'message' ) || '' )
    ? searchParams.get( 'message' )
    : null;

  const requestQuery = useMemo( () => {
    const params = new URLSearchParams( { status, sort, page: String( page ), limit: '15' } );
    if ( query ) {params.set( 'q', query );}
    return params.toString();
  }, [page, query, sort, status] );

  const updateQuery = useCallback( ( updates, navigation = 'replace' ) => {
    const next = new URLSearchParams( searchParams.toString() );
    Object.entries( updates ).forEach( ( [key, value] ) => {
      if ( value === undefined || value === null || value === '' || value === 'all' && key === 'status' ) {next.delete( key );}
      else {next.set( key, String( value ));}
    } );
    router[navigation]( `${pathname}${next.size ? `?${next.toString()}` : ''}`, { scroll: false } );
  }, [pathname, router, searchParams] );

  const loadContacts = useCallback( async () => {
    setLoading( true );
    setError( '' );
    try {
      const response = await axiosInstance.get( `/api/admin/contact?${requestQuery}` );
      setPayload( response.data );
    } catch ( requestError ) {
      setError( requestError.response?.data?.message || 'Unable to load contact messages.' );
    } finally {
      setLoading( false );
    }
  }, [requestQuery] );

  useEffect( () => { loadContacts(); }, [loadContacts] );
  useEffect( () => { setDraftQuery( query ); }, [query] );

  const submitSearch = event => {
    event.preventDefault();
    updateQuery( { q: draftQuery.trim(), page: 1, message: null } );
  };

  const openMessage = contactId => updateQuery( { message: contactId }, 'push' );
  const closeMessage = () => updateQuery( { message: null }, 'push' );
  const notifyInboxChanged = useCallback( () => {
    loadContacts();
    window.dispatchEvent( new Event( 'portfolio:inbox-updated' ) );
  }, [loadContacts] );

  return (
    <>
      <InboxToolbar component="form" onSubmit={ submitSearch }>
        <TextField
          size="small"
          label="Search Inbox"
          value={ draftQuery }
          onChange={ event => setDraftQuery( event.target.value ) }
          placeholder="Name, email, topic, or message…"
          slotProps={ { input: { startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" aria-hidden="true" /></InputAdornment> } } }
        />
        <Select size="small" value={ status } onChange={ event => updateQuery( { status: event.target.value, page: 1, message: null } ) } inputProps={ { 'aria-label': 'Contact status' } }>
          { statusOptions.map( option => <MenuItem key={ option } value={ option }>{ option === 'all' ? 'All Statuses' : option[0].toUpperCase() + option.slice( 1 ) }</MenuItem> ) }
        </Select>
        <Select size="small" value={ sort } onChange={ event => updateQuery( { sort: event.target.value, page: 1, message: null } ) } inputProps={ { 'aria-label': 'Contact sort order' } }>
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
        <Button type="submit" sx={ { display: { md: 'none' } } }>Search</Button>
      </InboxToolbar>

      <InboxNotice role="status" aria-live="polite">
        <NotificationsActiveOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">{ payload?.counts?.pending || 0 } new { payload?.counts?.pending === 1 ? 'message' : 'messages' }</Typography>
          <Typography component="p">Opening a new inquiry marks it as read. Replies always require your review before sending.</Typography>
        </Box>
      </InboxNotice>

      <StatusRail aria-label="Inbox status summary">
        { statusOptions.map( option => (
          <Chip
            key={ option }
            label={ `${option === 'all' ? 'All' : option[0].toUpperCase() + option.slice( 1 )} ${payload?.counts?.[option] || 0}` }
            color={ status === option ? 'primary' : 'default' }
            variant={ status === option ? 'filled' : 'outlined' }
            onClick={ () => updateQuery( { status: option, page: 1, message: null } ) }
          />
        ) ) }
      </StatusRail>

      { error && <Alert severity="error" action={ <Button color="inherit" size="small" onClick={ loadContacts }>Retry</Button> }>{ error }</Alert> }

      { loading ? (
        <Box aria-label="Loading contact messages" sx={ { display: 'grid', gap: 1 } }>
          { Array.from( { length: 5 } ).map( ( _, index ) => <Skeleton key={ index } variant="rounded" height={ 86 } /> ) }
        </Box>
      ) : error ? null : payload?.items?.length ? (
        <InboxList aria-label="Contact messages">
          { payload.items.map( contact => (
            <InboxRow
              key={ contact.id }
              onClick={ () => openMessage( contact.id ) }
              $unread={ contact.status === 'pending' }
              $selected={ selectedContactId === contact.id }
              aria-pressed={ selectedContactId === contact.id }
            >
              <Sender>
                <Typography component="p">{ contact.name }</Typography>
                <Typography component="p">{ contact.email }</Typography>
              </Sender>
              <MessagePreview>
                <Typography component="p">{ contact.service || 'General conversation' }</Typography>
                <Typography component="p">{ contact.message }</Typography>
              </MessagePreview>
              <InboxMeta>
                <StatusBadge component="span" $status={ contact.status }>{ contact.status }</StatusBadge>
                <Typography component="p">{ dateFormatter.format( new Date( contact.createdAt ) ) } · { contact.replyCount } { contact.replyCount === 1 ? 'reply' : 'replies' }</Typography>
              </InboxMeta>
            </InboxRow>
          ) ) }
        </InboxList>
      ) : (
        <EmptyInbox>
          <Box>
            <Typography component="h2" sx={ { mb: 1, fontSize: '1.1rem', fontWeight: 700 } }>No messages found</Typography>
            <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.84rem' } }>Try a different search or clear the current status filter.</Typography>
          </Box>
        </EmptyInbox>
      ) }

      { payload && <InboxFooter>
        <InboxCount component="p">{ payload?.pagination?.total || 0 } messages · Page { payload?.pagination?.page || 1 } of { payload?.pagination?.pages || 1 }</InboxCount>
        <Pagination page={ payload?.pagination?.page || 1 } count={ payload?.pagination?.pages || 1 } onChange={ ( _, nextPage ) => updateQuery( { page: nextPage, message: null } ) } size="small" color="primary" />
      </InboxFooter> }

      { selectedContactId && (
        <ContactDetailModal
          contactId={ selectedContactId }
          open
          onOpenChange={ open => { if ( !open ) {closeMessage();} } }
          onStatusUpdate={ notifyInboxChanged }
        />
      ) }
    </>
  );
}
