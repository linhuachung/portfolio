'use client';

// Styles shared by several dashboard components.
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const OverviewPage = styled( Box )( ( { theme } ) => ( {
  width: 'min(100%, 1280px)',
  minHeight: '100%',
  marginInline: 'auto',
  padding: theme.spacing( 3 ),
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( 2.5 ),
  [theme.breakpoints.down( 'sm' )]: {
    padding: theme.spacing( 2 ),
    gap: theme.spacing( 2 )
  }
} ) );

export const OperationsGrid = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.45fr) minmax(320px, .75fr)',
  gridTemplateAreas: '"attention inbox" "content inbox"',
  gap: theme.spacing( 2 ),
  alignItems: 'stretch',
  [theme.breakpoints.down( 'lg' )]: {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: '"attention" "inbox" "content"'
  }
} ) );

export const OverviewSurface = styled( Paper )( ( { theme } ) => ( {
  minWidth: 0,
  padding: theme.spacing( 2.5 ),
  border: `1px solid ${alpha( theme.palette.text.primary, .13 )}`,
  borderRadius: 10,
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.background.paper, .82 ),
  backgroundImage: 'none',
  boxShadow: 'none',
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 2 ) }
} ) );

export const SurfaceHeader = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  marginBottom: theme.spacing( 2 )
} ) );

export const SurfaceTitle = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: '1.05rem',
  fontWeight: 700,
  letterSpacing: '-.012em',
  lineHeight: 1.25
} ) );

export const SurfaceDescription = styled( Typography )( ( { theme } ) => ( {
  marginTop: theme.spacing( .45 ),
  color: theme.palette.text.secondary,
  fontSize: '.73rem',
  lineHeight: 1.45
} ) );

export const ClearState = styled( Box )( ( { theme } ) => ( {
  minHeight: 164,
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing( 3 ),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  '& svg': { color: theme.palette.success.main },
  '& p:first-of-type': { marginTop: theme.spacing( 1 ), color: theme.palette.text.primary, fontWeight: 700 },
  '& p:last-of-type': { marginTop: theme.spacing( .5 ), fontSize: '.75rem' }
} ) );
