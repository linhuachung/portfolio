'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import {
  ClearState,
  OverviewSurface,
  QueueAction,
  QueueCopy,
  QueueIcon,
  QueueItem,
  QueueList,
  SurfaceDescription,
  SurfaceHeader,
  SurfaceTitle
} from './Overview.styles';

function QueueVisual( { severity } ) {
  return severity === 'high'
    ? <ErrorOutlineRoundedIcon fontSize="small" aria-hidden="true" />
    : <WarningAmberRoundedIcon fontSize="small" aria-hidden="true" />;
}

export default function ActionQueue( { items = [], sx } ) {
  return (
    <OverviewSurface component="section" aria-labelledby="attention-title" sx={ sx }>
      <SurfaceHeader>
        <Box>
          <SurfaceTitle component="h2" id="attention-title">Needs Attention</SurfaceTitle>
          <SurfaceDescription component="p">
            Work that can affect response time or what appears publicly.
          </SurfaceDescription>
        </Box>
        <Chip
          size="small"
          color={ items.length ? 'warning' : 'success' }
          variant="outlined"
          label={ items.length ? `${items.length} ${items.length === 1 ? 'priority' : 'priorities'}` : 'All clear' }
        />
      </SurfaceHeader>

      { items.length ? (
        <QueueList component="ul">
          { items.map( item => (
            <Box component="li" key={ item.id }>
              <QueueItem component={ NextLink } href={ item.href }>
                <QueueIcon $severity={ item.severity }>
                  <QueueVisual severity={ item.severity } />
                </QueueIcon>
                <QueueCopy>
                  <Typography component="h3">{ item.title }</Typography>
                  <Typography component="p">{ item.detail }</Typography>
                </QueueCopy>
                <QueueAction component="span">
                  { item.actionLabel || 'Open' }
                  <ArrowForwardRoundedIcon aria-hidden="true" sx={ { fontSize: 16 } } />
                </QueueAction>
              </QueueItem>
            </Box>
          ) ) }
        </QueueList>
      ) : (
        <ClearState role="status">
          <Box>
            <CheckCircleOutlineRoundedIcon aria-hidden="true" />
            <Typography component="p">Operations are clear</Typography>
            <Typography component="p">No inbox or publishing actions need attention.</Typography>
          </Box>
        </ClearState>
      ) }
    </OverviewSurface>
  );
}
