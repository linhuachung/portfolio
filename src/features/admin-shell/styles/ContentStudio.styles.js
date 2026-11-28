'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const StudioPage = styled( Box )( ( { theme } ) => ( {
  width: 'min(100%, 1320px)',
  minHeight: '100%',
  marginInline: 'auto',
  padding: theme.spacing( 3 ),
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( 3 ),
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 2 ), gap: theme.spacing( 2 ) }
} ) );

export const StudioHeader = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  paddingBottom: theme.spacing( 2.5 ),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& > div:first-of-type': { display: 'grid', gap: theme.spacing( .75 ) },
  [theme.breakpoints.down( 'lg' )]: { alignItems: 'flex-start', flexDirection: 'column' }
} ) );

export const StudioEyebrow = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.68rem',
  fontWeight: 700,
  letterSpacing: '.1em',
  textTransform: 'uppercase'
} ) );

export const StudioTitle = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: 'clamp(1.85rem, 3vw, 2.75rem)',
  fontWeight: 680,
  letterSpacing: '-.035em',
  lineHeight: 1.02,
  textWrap: 'balance'
} ) );

export const StudioDescription = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '66ch',
  color: theme.palette.text.secondary,
  fontSize: '.9rem',
  lineHeight: 1.55,
  textWrap: 'pretty'
} ) );

export const StudioActions = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing( 1 ),
  flexWrap: 'wrap'
} ) );

export const PreviewButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 42,
  flexShrink: 0,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main }
} ) );

export const SourceNotice = styled( Paper )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: theme.spacing( 1.5 ),
  padding: theme.spacing( 1.5, 2 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .24 )}`,
  borderRadius: 10,
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.primary.main, .07 ),
  boxShadow: 'none',
  '& svg': { color: theme.palette.primary.main },
  '& p:first-of-type': { fontSize: '.8rem', fontWeight: 700 },
  '& p:last-of-type': { color: theme.palette.text.secondary, fontSize: '.75rem', lineHeight: 1.45 }
} ) );

export const FactStrip = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down( 'md' )]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }
} ) );

export const Fact = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .5 ),
  padding: theme.spacing( 2 ),
  borderLeft: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': { borderLeft: 0 },
  '& dt': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.62rem', letterSpacing: '.08em', textTransform: 'uppercase' },
  '& dd': { margin: 0, color: theme.palette.text.primary, fontSize: 'clamp(1.25rem, 2.6vw, 2rem)', fontWeight: 650, letterSpacing: '-.035em' },
  [theme.breakpoints.down( 'md' )]: {
    '&:nth-of-type(3)': { borderLeft: 0, borderTop: `1px solid ${theme.palette.divider}` },
    '&:nth-of-type(4)': { borderTop: `1px solid ${theme.palette.divider}` }
  }
} ) );

export const RecordList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  borderTop: `1px solid ${theme.palette.divider}`
} ) );

export const RecordRow = styled( Paper )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(180px, .75fr) minmax(0, 1.55fr) auto',
  gap: theme.spacing( 3 ),
  alignItems: 'start',
  padding: theme.spacing( 2.25, 0 ),
  border: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: theme.transitions.create( ['background-color', 'padding'], { duration: 180 } ),
  '&:hover': { paddingInline: theme.spacing( 1.5 ), backgroundColor: alpha( theme.palette.text.primary, .025 ) },
  [theme.breakpoints.down( 'lg' )]: { gridTemplateColumns: '1fr auto', gap: theme.spacing( 1.25 ), '& > div:nth-of-type(2)': { gridColumn: '1 / -1' } },
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr', '& > *': { gridColumn: '1 !important' } }
} ) );

export const RecordIdentity = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: theme.spacing( .4 ),
  columnGap: theme.spacing( 1.25 ),
  '& > div:last-of-type': { minWidth: 0, display: 'grid', gap: theme.spacing( .4 ) },
  '& h2': { color: theme.palette.text.primary, fontSize: '1rem', fontWeight: 700, lineHeight: 1.25 },
  '& p': { color: theme.palette.text.secondary, fontSize: '.75rem', lineHeight: 1.4 }
} ) );

export const RecordAvatar = styled( Avatar )( ( { theme } ) => ( {
  width: 44,
  height: 44,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 9,
  color: theme.palette.text.secondary,
  backgroundColor: alpha( theme.palette.primary.main, .08 ),
  '& img': { objectFit: 'cover' }
} ) );

export const RecordBody = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( 1 ),
  '& > p': { color: theme.palette.text.secondary, fontSize: '.84rem', lineHeight: 1.55 },
  '& ul': { margin: 0, paddingLeft: theme.spacing( 2.25 ), color: theme.palette.text.secondary, fontSize: '.78rem', lineHeight: 1.55 }
} ) );

export const TagRow = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing( .6 )
} ) );

export const Tag = styled( Typography )( ( { theme } ) => ( {
  padding: theme.spacing( .4, .75 ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 6,
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.62rem',
  lineHeight: 1.2
} ) );

export const RecordAside = styled( Box )( ( { theme } ) => ( {
  minWidth: 132,
  display: 'grid',
  justifyItems: 'end',
  gap: theme.spacing( 1 ),
  [theme.breakpoints.down( 'sm' )]: { minWidth: 0, justifyItems: 'start' }
} ) );

export const StateBadge = styled( Typography, { shouldForwardProp: prop => prop !== '$tone' } )( ( { theme, $tone = 'neutral' } ) => {
  const colors = { positive: theme.palette.success.main, caution: theme.palette.warning.main, neutral: theme.palette.text.secondary, info: theme.palette.info.main };
  const color = colors[$tone] || colors.neutral;
  return {
    display: 'inline-flex',
    padding: theme.spacing( .45, .8 ),
    borderRadius: 6,
    color,
    backgroundColor: alpha( color, .12 ),
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.61rem',
    fontWeight: 700,
    letterSpacing: '.045em',
    lineHeight: 1.2,
    textTransform: 'uppercase'
  };
} );

export const TextAction = styled( Button )( ( { theme } ) => ( {
  minHeight: 34,
  paddingInline: theme.spacing( 1 ),
  color: theme.palette.text.secondary,
  fontSize: '.7rem',
  '&:hover': { color: theme.palette.primary.main, backgroundColor: alpha( theme.palette.primary.main, .08 ) }
} ) );
