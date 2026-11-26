'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';

const InboxClient = dynamic( () => import( './InboxClient' ), {
  ssr: false,
  loading: () => (
    <Box aria-label="Preparing inbox" sx={ { display: 'grid', gap: 1.5 } }>
      <Skeleton variant="rounded" height={ 68 } />
      <Skeleton variant="rounded" height={ 68 } />
      <Skeleton variant="rounded" height={ 220 } />
    </Box>
  )
} );

export default function InboxClientBoundary() {
  return <InboxClient />;
}
