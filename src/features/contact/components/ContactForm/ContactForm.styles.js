'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { alpha, keyframes, styled } from '@mui/material/styles';

const fieldStyles = _theme => ( {
  '& .MuiOutlinedInput-root': {
    minWidth: 0,
    minHeight: 52,
    borderRadius: 10,
    fontSize: '.88rem'
  },
  '& .MuiInputLabel-root': { fontSize: '.84rem' },
  '& .MuiFormHelperText-root': { margin: '.25rem 0 0', fontSize: '.68rem', lineHeight: 1.25 },
  '@media (max-width: 680px)': {
    '& .MuiOutlinedInput-root': { minHeight: 42 },
    '& .MuiInputBase-input': { paddingBlock: '.65rem' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    '& .MuiOutlinedInput-root': { minHeight: 36 },
    '& .MuiInputBase-input': { padding: '.45rem .6rem' },
    '& .MuiInputLabel-root': { fontSize: '.72rem' }
  }
} );

export const formEnter = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(.995); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const ContactFormPanel = styled( Paper )( ( { theme } ) => ( {
  width: 'min(100%, 760px)',
  minWidth: 0,
  alignSelf: 'start',
  justifySelf: 'end',
  border: `1px solid ${theme.palette.divider}`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRadius: 14,
  padding: 'clamp(1.15rem, 2.2vw, 2rem)',
  color: theme.palette.text.primary,
  background: `linear-gradient(145deg, ${alpha( theme.palette.background.paper, .94 )}, ${alpha( theme.palette.background.default, .82 )})`,
  boxShadow: `0 22px 60px ${alpha( '#000', .09 )}`,
  ...fieldStyles( theme ),
  '& .MuiButton-root': { minHeight: 44, paddingInline: '1.1rem', fontSize: '.75rem', fontWeight: 720, letterSpacing: '.02em' },
  '& .MuiButton-contained:hover': { backgroundColor: theme.palette.text.primary },
  '& .MuiChip-root': { borderRadius: 6, color: theme.palette.text.primary, backgroundColor: alpha( theme.palette.primary.main, .1 ) },
  '@media (max-width: 680px)': { width: '100%', justifySelf: 'stretch', padding: '.85rem', borderRadius: 8 },
  '@media (min-width: 681px) and (max-width: 900px)': { width: '100%', padding: '1rem' },
  '@media (max-height: 430px) and (orientation: landscape)': {
    padding: '.65rem .85rem',
    '& .MuiButton-root': { minHeight: 34 }
  },
  '@media (max-width: 420px) and (max-height: 610px)': { padding: '.65rem', '& .MuiButton-root': { minHeight: 36 } }
} ) );


export const ContactForm = styled( ContactFormPanel )( {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: 'clamp(.85rem, 1.7vh, 1.2rem)',
  '@media (max-width: 680px)': { gap: '.65rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.42rem' },
  '@media (max-width: 420px) and (max-height: 610px)': { gap: '.45rem' }
} );

export const FormHeader = styled( Box )( {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1rem',
  '& > div': { display: 'grid', gap: '.35rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { '& > div': { gap: '.12rem' } }
} );

export const FormTitle = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: 'clamp(1.45rem, 2.2vw, 2.15rem)',
  fontWeight: 620,
  lineHeight: 1.05,
  letterSpacing: '-.035em',
  '@media (max-width: 680px)': { fontSize: '1.25rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '1.12rem' },
  '@media (max-width: 420px) and (max-height: 610px)': { fontSize: '1.05rem' }
} ) );

export const StepCount = styled( Chip )( ( { theme } ) => ( {
  flex: '0 0 auto',
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.63rem'
} ) );

export const FormStepper = styled( Stepper )( ( { theme } ) => ( {
  padding: 0,
  '& .MuiStep-root': { paddingInline: 0 },
  '& .MuiStepLabel-label': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.66rem', letterSpacing: '.06em', textTransform: 'uppercase' },
  '& .MuiStepLabel-label.Mui-active, & .MuiStepLabel-label.Mui-completed': { color: theme.palette.text.primary, fontWeight: 650 },
  '& .MuiStepIcon-root': { color: theme.palette.divider, fontSize: '1.4rem' },
  '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed': { color: theme.palette.primary.main },
  '& .MuiStepConnector-line': { borderColor: theme.palette.divider },
  '@media (max-width: 680px)': { '& .MuiStepLabel-label': { fontSize: '.58rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& .MuiStepIcon-root': { fontSize: '1.15rem' }, '& .MuiStepLabel-label': { fontSize: '.55rem' } }
} ) );

export const SubmitAlert = styled( Alert )( { paddingBlock: '.3rem', fontSize: '.74rem' } );

export const FormStep = styled( Box, { shouldForwardProp: property => property !== '$reduceMotion' } )( ( { $reduceMotion } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: '1rem',
  border: 0,
  padding: 0,
  margin: 0,
  animation: $reduceMotion ? 'none' : `${formEnter} 200ms cubic-bezier(.2,.8,.2,1) both`,
  '@media (max-width: 680px)': { gap: '.65rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.42rem' }
} ) );

export const VisuallyHiddenLegend = styled( Typography )( {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap'
} );

export const FieldGrid = styled( Box )( {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  '@media (max-width: 680px)': { gridTemplateColumns: '1fr', gap: '.55rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gridTemplateColumns: '1fr 1fr', gap: '.42rem .65rem' }
} );

export const MessageField = styled( TextField )( {
  '& .MuiInputBase-root': { minHeight: 132, alignItems: 'flex-start' },
  '& textarea': { resize: 'none' },
  '@media (max-width: 680px)': { '& .MuiInputBase-root': { minHeight: 86 } },
  '@media (max-height: 430px) and (orientation: landscape), (max-width: 420px) and (max-height: 610px)': { '& .MuiInputBase-root': { minHeight: 62 } }
} );

export const ReviewChips = styled( Stack )( {
  flexWrap: 'wrap',
  '@media (max-width: 420px) and (max-height: 610px)': { display: 'none' }
} );

export const FormActions = styled( Box, { shouldForwardProp: property => property !== '$single' } )( ( { $single } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: $single ? 'space-between' : 'flex-end',
  gap: '.75rem',
  '@media (max-width: 680px), (max-height: 430px) and (orientation: landscape)': { justifyContent: 'flex-end' }
} ) );

export const PrivacyNote = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '31ch',
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: '.69rem',
  lineHeight: 1.45,
  '@media (max-width: 680px), (max-height: 430px) and (orientation: landscape)': { display: 'none' }
} ) );

export const Confirmation = styled( ContactFormPanel, { shouldForwardProp: property => property !== '$reduceMotion' } )( ( { theme, $reduceMotion } ) => ( {
  display: 'grid',
  alignContent: 'center',
  justifyItems: 'start',
  gap: '.85rem',
  minHeight: 360,
  animation: $reduceMotion ? 'none' : `${formEnter} 200ms cubic-bezier(.2,.8,.2,1) both`,
  '& > svg': { color: theme.palette.primary.main, fontSize: '2.5rem' },
  '@media (max-width: 680px)': { minHeight: 260 }
} ) );
