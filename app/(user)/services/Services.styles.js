'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { AnimatedPanel, ScreenPage, TextLink } from '@/app/(user)/components/PublicLayout.styles';

export const ServicesScreen = styled( ScreenPage )( {
  display: 'grid',
  minHeight: 0,
  gridTemplateRows: 'auto minmax(0, 1fr)',
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(130px, .24fr) minmax(0, 1fr)',
    columnGap: '.75rem',
    '& > header': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '.35rem',
      padding: 0,
      borderBottom: 0
    }
  }
} );

export const SelectorLayout = styled( Box )( {
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(220px, .38fr) minmax(0, 1fr)',
  '@media (max-width: 680px)': { gridTemplate: 'auto minmax(0, 1fr) / 1fr' },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(140px, .34fr) minmax(0, 1fr)'
  }
} );

export const ServiceSelector = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  margin: 0,
  padding: '1rem 0',
  listStyle: 'none',
  borderRight: `1px solid ${theme.palette.divider}`,
  '@media (max-width: 680px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    paddingTop: 0,
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplateColumns: '1fr',
    paddingTop: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: 0
  }
} ) );

export const ServiceButton = styled( Button )( ( { theme } ) => ( {
  width: '100%',
  minWidth: 0,
  minHeight: 58,
  display: 'grid',
  gridTemplateColumns: '2.1rem 1fr',
  alignItems: 'center',
  justifyContent: 'initial',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  padding: '.5rem 1rem .5rem 0',
  color: theme.palette.text.secondary,
  textAlign: 'left',
  fontSize: '.86rem',
  '& [data-service-number]': { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.65rem', lineHeight: 1 },
  '& [data-service-label], & [data-service-compact]': { fontSize: 'inherit', lineHeight: 'inherit' },
  '& [data-service-compact]': { display: 'none' },
  '&[aria-selected="true"], &:hover': { color: theme.palette.text.primary, backgroundColor: theme.palette.action.hover },
  '&[aria-selected="true"]': { fontWeight: 620, backgroundColor: theme.palette.action.selected },
  '@media (max-width: 680px)': {
    minHeight: 42,
    gridTemplateColumns: '1.3rem minmax(0, 1fr)',
    justifyItems: 'start',
    borderTop: 0,
    padding: '.35rem .5rem',
    fontSize: '.62rem',
    lineHeight: 1.15,
    overflowWrap: 'anywhere',
    textAlign: 'left',
    '& [data-service-label]': { display: 'none' },
    '& [data-service-number]': { fontSize: '.58rem' },
    '& [data-service-compact]': { display: 'block', whiteSpace: 'nowrap' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    minHeight: 44,
    gridTemplateColumns: '1.45rem minmax(0, 1fr)',
    justifyItems: 'start',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '.25rem .5rem 0 0',
    fontSize: '.62rem',
    lineHeight: 1.2,
    overflowWrap: 'normal',
    textAlign: 'left',
    '& [data-service-label]': { display: 'block' },
    '& [data-service-compact]': { display: 'none' }
  }
} ) );

export const DetailPanel = styled( AnimatedPanel )( ( { theme } ) => ( {
  position: 'relative',
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, .55fr)',
  alignContent: 'start',
  gap: '1.2rem clamp(2rem, 5vw, 6rem)',
  isolation: 'isolate',
  overflow: 'hidden',
  padding: '1.5rem 0 1.5rem clamp(1.3rem, 5vw, 5rem)',
  '& > div:nth-of-type(2)': { display: 'grid', gap: '.6rem' },
  '& > *': { position: 'relative', zIndex: 1 },
  '& h2': { maxWidth: '17ch' },
  '&::after': {
    position: 'absolute',
    zIndex: 0,
    right: '-.04em',
    bottom: '-.18em',
    content: 'attr(data-focus)',
    color: 'transparent',
    fontSize: 'clamp(12rem, 28vw, 28rem)',
    fontWeight: 760,
    letterSpacing: '-.1em',
    lineHeight: .8,
    opacity: .12,
    WebkitTextStroke: `1px ${theme.palette.divider}`,
    pointerEvents: 'none'
  },
  '@media (max-width: 680px)': {
    gridTemplateColumns: '1fr',
    gap: '.7rem',
    padding: '.8rem 0 0',
    '& h2': { fontSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
    '&::after': { fontSize: '11rem', opacity: .08 }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplateColumns: '1fr',
    gap: '.28rem',
    padding: '.2rem 0 0 .75rem',
    '& h2': { maxWidth: '20ch', fontSize: '1.3rem' }
  }
} ) );

export const DetailNumber = styled( Box )( ( { theme } ) => ( {
  gridColumn: '1 / -1',
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.68rem',
  textTransform: 'uppercase',
  '@media (max-width: 680px)': { gridColumn: 1 },
  '@media (max-height: 430px) and (orientation: landscape)': { display: 'none' }
} ) );

export const CapabilityList = styled( Box )( ( { theme } ) => ( {
  alignSelf: 'end',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { padding: '.55rem 0', borderTop: `1px solid ${theme.palette.divider}`, color: theme.palette.text.secondary, fontSize: '.82rem' },
  '@media (max-width: 680px)': { alignSelf: 'auto', '& li': { padding: '.38rem 0', fontSize: '.75rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& li': { padding: '.27rem 0', fontSize: '.68rem' } }
} ) );

export const ServiceProjectLink = styled( TextLink )( {
  gridColumn: '1 / -1'
} );
