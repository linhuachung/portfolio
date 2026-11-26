import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const ModalStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 3 ), marginTop: theme.spacing( 2 ) } ) );
export const SectionStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 2 ) } ) );
export const Panel = styled( Box )( ( { theme } ) => ( { minWidth: 0, maxWidth: '100%', padding: theme.spacing( 2 ), border: `1px solid ${theme.palette.divider}`, borderRadius: 8, backgroundColor: alpha( theme.palette.background.default, .55 ) } ) );
export const PanelTitle = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( 1.5 ), color: theme.palette.text.primary, fontSize: '.875rem', fontWeight: 650 } ) );
export const DetailLabel = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( .5 ), color: theme.palette.text.secondary, fontSize: '.75rem' } ) );
export const DetailValue = styled( Typography )( ( { theme } ) => ( { color: theme.palette.text.primary, fontSize: '.9rem', fontWeight: 500 } ) );
export const DetailLink = styled( MuiLink )( ( { theme } ) => ( { color: theme.palette.primary.main, fontSize: '1rem', '&:hover': { textDecoration: 'underline' } } ) );
export const ReplyItem = styled( Box )( ( { theme } ) => ( { padding: theme.spacing( 1.5 ), border: `1px solid ${alpha( theme.palette.success.main, .25 )}`, borderRadius: 6, backgroundColor: theme.palette.background.paper } ) );
export const AiToolbar = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing( 1 ),
  marginBottom: theme.spacing( 1.5 ),
  padding: theme.spacing( 1 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .2 )}`,
  borderRadius: 8,
  backgroundColor: alpha( theme.palette.primary.main, .055 ),
  [theme.breakpoints.down( 'sm' )]: { alignItems: 'stretch', flexDirection: 'column' }
} ) );
