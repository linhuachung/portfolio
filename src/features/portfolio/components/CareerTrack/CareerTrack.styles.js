'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, keyframes, styled } from '@mui/material/styles';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 var(--pulse-color); }
  70% { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
`;

// Phones held upright have height to spare, and a landscape phone has a side
// column: both read better as a vertical list than as a squeezed horizontal bar.
const VERTICAL_TRACK = '@media (max-width: 900px) and (min-height: 740px), (max-height: 430px) and (orientation: landscape)';
const TALL_VERTICAL = '@media (max-width: 900px) and (min-height: 1000px)';
const NARROW_TRACK = '@media (max-width: 680px)';
// Narrow and not vertical: the squeezed horizontal bar, which uses abbreviated tenure ("2y 1m").
const NARROW_HORIZONTAL = '@media (max-width: 680px) and (max-height: 739px)';
const SMALLEST = '@media (max-width: 389px)';
// Small phones (iPhone SE class) keep the bar, name and tenure but drop the logos.
const TINY_TRACK = '@media (max-width: 680px) and (max-height: 600px)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
// Large desktop screens get a bolder track so the page does not end half-empty.
const ROOMY = '@media (min-width: 1100px) and (min-height: 820px)';

export const TrackList = styled( Box )( {
  '--segment-min': 'clamp(68px, 12.5vw, 132px)',
  display: 'grid',
  // Each role's width follows its tenure; see `--track-columns` in CareerTrack.
  gridTemplateColumns: 'var(--track-columns)',
  gap: 4,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& > li': { minWidth: 0 },
  [ROOMY]: { '--segment-min': '158px' },
  [SMALLEST]: { '--segment-min': '64px' },
  [VERTICAL_TRACK]: { gridTemplateColumns: '1fr', gap: 3 }
} );

export const Segment = styled( Button )( ( { theme } ) => {
  const worked = alpha( theme.palette.primary.main, theme.palette.mode === 'dark' ? .45 : .35 );
  return {
    // Every role reads as worked time; only the selected one is solid. The current role is never muted.
    '--bar-color': worked,
    '--pulse-color': alpha( theme.palette.primary.main, .45 ),
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplate: 'auto auto / minmax(0, 1fr)',
    // MUI centres button content; the bar must span the whole segment instead.
    alignContent: 'start',
    justifyContent: 'stretch',
    justifyItems: 'stretch',
    gap: '.5rem',
    borderRadius: 8,
    padding: '0 0 .55rem',
    color: theme.palette.text.secondary,
    textAlign: 'left',
    textTransform: 'none',
    '&:hover': { '--bar-color': alpha( theme.palette.primary.main, .6 ), backgroundColor: alpha( theme.palette.text.primary, .035 ) },
    '&[aria-current="step"]': {
      '--bar-color': theme.palette.primary.main,
      color: theme.palette.text.primary,
      backgroundColor: alpha( theme.palette.primary.main, .07 )
    },
    '&[aria-current="step"] [data-logo]': { borderColor: theme.palette.primary.main, boxShadow: `0 0 0 2px ${alpha( theme.palette.primary.main, .2 )}` },
    [ROOMY]: { gap: '.75rem', paddingBottom: '.8rem' },
    [NARROW_TRACK]: { gap: '.35rem', paddingBottom: '.4rem' },
    [VERTICAL_TRACK]: {
      gridTemplate: 'auto / 6px minmax(0, 1fr)',
      columnGap: '.75rem',
      padding: '0 .6rem 0 0'
    }
  };
} );

export const SegmentBar = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  height: 8,
  borderRadius: 999,
  backgroundColor: 'var(--bar-color)',
  // Unselected bars are drawn thinner without changing the layout box, so selecting causes no shift.
  transform: 'scaleY(.75)',
  transition: 'background-color 160ms ease, transform 160ms ease',
  '[aria-current="step"] > &': { transform: 'none' },
  // The current role ends in a live marker whichever role is selected.
  '[data-current] > &::after': {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: 10,
    height: 10,
    content: '""',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-50%)',
    animation: `${pulse} 2.2s ease-out infinite`
  },
  [VERTICAL_TRACK]: {
    width: 6,
    height: 'auto',
    minHeight: 44,
    transform: 'scaleX(.75)',
    '[data-current] > &::after': { top: 'auto', right: '50%', bottom: 0, transform: 'translateX(50%)' }
  }
} ) );

export const SegmentBody = styled( Box )( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  columnGap: '.55rem',
  rowGap: '.25rem',
  alignItems: 'center',
  paddingInline: '.6rem',
  [NARROW_TRACK]: { gridTemplateColumns: '1fr', justifyItems: 'start', rowGap: '.25rem', paddingInline: '.3rem' },
  [VERTICAL_TRACK]: { gridTemplateColumns: 'auto minmax(0, 1fr)', alignSelf: 'center', paddingBlock: '.45rem', paddingInline: 0 },
  [TALL_VERTICAL]: { paddingBlock: '.7rem' },
  [LANDSCAPE]: { paddingBlock: '.25rem' }
} );

export const SegmentLogo = styled( Box )( ( { theme } ) => ( {
  width: 28,
  height: 28,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  transition: 'box-shadow 160ms ease, border-color 160ms ease',
  '& img': { width: '100%', height: '100%', objectFit: 'cover' },
  [ROOMY]: { width: 36, height: 36 },
  [NARROW_TRACK]: { width: 26, height: 26 },
  [VERTICAL_TRACK]: { width: 30, height: 30 },
  [TINY_TRACK]: { display: 'none' },
  [LANDSCAPE]: { width: 24, height: 24 }
} ) );

export const SegmentHeading = styled( Box )( {
  minWidth: 0,
  display: 'grid',
  gap: '.15rem'
} );

export const SegmentCompany = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'baseline',
  gap: '.45rem',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontSize: '.8125rem',
  fontWeight: 650,
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  '& > span:last-of-type': { overflow: 'hidden', color: theme.palette.text.secondary, fontWeight: 450, textOverflow: 'ellipsis' },
  [ROOMY]: { fontSize: '.9375rem' },
  [SMALLEST]: { fontSize: '.6875rem' },
  [VERTICAL_TRACK]: { fontSize: '.875rem' },
  [LANDSCAPE]: { fontSize: '.75rem' }
} ) );

export const SegmentRole = styled( Box )( {
  // The role name sits next to the company where the row is wide enough.
  display: 'none',
  [VERTICAL_TRACK]: { display: 'inline' }
} );

export const SegmentDuration = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  gap: '.4rem',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6875rem',
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  [ROOMY]: { fontSize: '.75rem' },
  [NARROW_HORIZONTAL]: { '& [data-full]': { display: 'none' } },
  [VERTICAL_TRACK]: { fontSize: '.75rem', '& [data-full]': { display: 'inline' } },
  [LANDSCAPE]: { fontSize: '.6875rem' }
} ) );

export const ShortDuration = styled( Box )( {
  display: 'none',
  [NARROW_HORIZONTAL]: { display: 'inline' },
  [VERTICAL_TRACK]: { display: 'none' }
} );

export const SegmentDates = styled( Box )( {
  display: 'none',
  [VERTICAL_TRACK]: { display: 'inline' }
} );

export const SegmentDetail = styled( Box )( ( { theme } ) => ( {
  gridColumn: '1 / -1',
  minWidth: 0,
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  fontSize: '.8125rem',
  lineHeight: 1.3,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& > span': { display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' },
  '& > span + span': { marginTop: '.15rem', fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem' },
  [ROOMY]: { fontSize: '.875rem', '& > span + span': { marginTop: '.2rem', fontSize: '.75rem' } },
  [NARROW_TRACK]: { display: 'none' },
  [VERTICAL_TRACK]: { display: 'none' }
} ) );

export const NowBadge = styled( Box )( ( { theme } ) => ( {
  borderRadius: 6,
  padding: '.05rem .35rem',
  color: theme.palette.primary.main,
  backgroundColor: alpha( theme.palette.primary.main, .12 ),
  fontSize: '.6875rem',
  fontWeight: 700,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  [NARROW_TRACK]: { display: 'none' },
  [VERTICAL_TRACK]: { display: 'inline' }
} ) );
