'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { SurfaceDescription, SurfaceHeader, SurfaceTitle } from '../../styles/Overview.styles';
import { ContentCopy, ContentGrid, ContentItem, ContentStateIcon, ContentSurface } from './ContentHealth.styles';

const contentRecords = [
  { key: 'experience', label: 'Experience', href: '/admin/experience' },
  { key: 'projects', label: 'Projects', href: '/admin/project' },
  { key: 'education', label: 'Education', href: '/admin/education' },
  { key: 'skills', label: 'Skills', href: '/admin/user' }
];

export default function ContentHealth( { summary = {}, sx } ) {
  return (
    <ContentSurface component="section" aria-labelledby="publishing-status-title" sx={ sx }>
      <SurfaceHeader sx={ { mb: 0 } }>
        <Box>
          <SurfaceTitle component="h2" id="publishing-status-title">Publishing Status</SurfaceTitle>
          <SurfaceDescription component="p">
            Canonical portfolio records and evidence checks.
          </SurfaceDescription>
        </Box>
      </SurfaceHeader>

      <ContentGrid>
        { contentRecords.map( record => {
          const state = summary[record.key] || {};
          const attention = state.status === 'attention';
          const ready = state.status === 'ready';
          const statusLabel = attention ? 'Needs review' : ready ? 'Ready' : 'Status unavailable';
          const displayDetail = attention
            ? `${state.issues ?? 0} to review`
            : record.key === 'experience' && state.detail
              ? state.detail
              : statusLabel;
          return (
            <ContentItem
              component={ NextLink }
              href={ record.href }
              key={ record.key }
              aria-label={ `Open ${record.label}: ${statusLabel}` }
            >
              <ContentStateIcon $attention={ attention || !ready }>
                { attention || !ready
                  ? <WarningAmberRoundedIcon fontSize="small" aria-hidden="true" />
                  : <CheckCircleOutlineRoundedIcon fontSize="small" aria-hidden="true" /> }
              </ContentStateIcon>
              <ContentCopy>
                <Typography component="h3">
                  { record.label }
                  { ' ' }
                  ·
                  { ' ' }
                  { state.total ?? '—' }
                </Typography>
                <Typography component="p">{ displayDetail }</Typography>
              </ContentCopy>
              <ArrowForwardRoundedIcon aria-hidden="true" sx={ { color: 'text.secondary', fontSize: 18 } } />
            </ContentItem>
          );
        } ) }
      </ContentGrid>
    </ContentSurface>
  );
}
