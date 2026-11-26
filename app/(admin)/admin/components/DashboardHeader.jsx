'use client';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import NextLink from 'next/link';
import {
  HeaderActions,
  OverviewDescription,
  OverviewEyebrow,
  OverviewHeaderCopy,
  OverviewHeaderRoot,
  OverviewTitle,
  RefreshButton,
  UpdatedMeta
} from './Overview.styles';

const dateFormatter = new Intl.DateTimeFormat( 'en-US', {
  timeZone: 'Asia/Bangkok',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
} );

function formatUpdatedAt( generatedAt ) {
  if ( !generatedAt ) {return 'Waiting for live data';}
  const date = new Date( generatedAt );
  return Number.isNaN( date.getTime() ) ? 'Update time unavailable' : `Updated ${dateFormatter.format( date )}`;
}

export default function DashboardHeader( { generatedAt, onRefresh, refreshing } ) {
  return (
    <OverviewHeaderRoot>
      <OverviewHeaderCopy>
        <OverviewEyebrow component="p">Operations Workspace</OverviewEyebrow>
        <OverviewTitle component="h1">Overview</OverviewTitle>
        <OverviewDescription component="p">
          Prioritize conversations, check publishing readiness, and understand recent audience signals.
        </OverviewDescription>
      </OverviewHeaderCopy>

      <HeaderActions>
        <UpdatedMeta component="p">
          <AccessTimeOutlinedIcon aria-hidden="true" sx={ { fontSize: 15 } } />
          { formatUpdatedAt( generatedAt ) }
        </UpdatedMeta>
        <Button
          component={ NextLink }
          href="/"
          target="_blank"
          rel="noreferrer"
          variant="text"
          endIcon={ <OpenInNewOutlinedIcon fontSize="small" /> }
        >
          View Site
        </Button>
        <RefreshButton
          type="button"
          onClick={ onRefresh }
          disabled={ refreshing }
          variant="outlined"
          startIcon={ refreshing
            ? <CircularProgress size={ 15 } color="inherit" aria-hidden="true" />
            : <RefreshOutlinedIcon fontSize="small" aria-hidden="true" /> }
        >
          { refreshing ? 'Refreshing…' : 'Refresh Data' }
        </RefreshButton>
      </HeaderActions>
    </OverviewHeaderRoot>
  );
}
