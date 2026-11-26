'use client';

import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LineChart from '@/features/dashboard/components/LineChart';
import { buildAudienceSummary } from '@/features/dashboard/utils/overview';
import { PERIOD_OPTIONS } from '../../constants/periods';
import {
  AudienceBody,
  AudienceHeader,
  AudienceSurface,
  ChartRegion,
  ClearState,
  Metric,
  MetricBand,
  PageProgress,
  PeriodSelect,
  SurfaceDescription,
  SurfaceTitle,
  TopPageList,
  TopPageRow,
  TopPagesRegion
} from '../../styles/Overview.styles';

const numberFormatter = new Intl.NumberFormat( 'en-US' );

function metricValue( value, suffix = '' ) {
  if ( value === null || value === undefined ) {return '—';}
  return `${numberFormatter.format( value )}${suffix}`;
}

export default function AudienceOverview( {
  charts = {},
  databaseAvailable = true,
  period,
  onPeriodChange
} ) {
  const visits = charts.visits || [];
  const downloads = charts.cvDownloads || [];
  const topPages = ( charts.visitsByPath || [] ).slice( 0, 5 );
  const summary = buildAudienceSummary( { visits, downloads, databaseAvailable } );
  const periodLabel = PERIOD_OPTIONS.find( option => option.value === period )?.label || 'Selected Period';
  const largestPageCount = Math.max( ...topPages.map( page => page.count ), 1 );

  return (
    <AudienceSurface component="section" aria-labelledby="audience-title">
      <AudienceHeader>
        <Box>
          <SurfaceTitle component="h2" id="audience-title">Audience Signal</SurfaceTitle>
          <SurfaceDescription component="p">
            Period-specific visits, résumé interest, and the public pages receiving attention.
          </SurfaceDescription>
        </Box>
        <PeriodSelect
          value={ period }
          onChange={ event => onPeriodChange( event.target.value ) }
          inputProps={ { 'aria-label': 'Audience reporting period' } }
        >
          { PERIOD_OPTIONS.map( option => (
            <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>
          ) ) }
        </PeriodSelect>
      </AudienceHeader>

      <MetricBand component="ul">
        <Metric component="li">
          <Typography component="p" data-kind="label">Visits</Typography>
          <Typography component="p" data-kind="value">{ metricValue( summary.visits ) }</Typography>
          <Typography component="p" data-kind="hint">{ periodLabel }</Typography>
        </Metric>
        <Metric component="li">
          <Typography component="p" data-kind="label">CV Downloads</Typography>
          <Typography component="p" data-kind="value">{ metricValue( summary.downloads ) }</Typography>
          <Typography component="p" data-kind="hint">{ periodLabel }</Typography>
        </Metric>
        <Metric component="li">
          <Typography component="p" data-kind="label">Downloads / 100 Visits</Typography>
          <Typography component="p" data-kind="value">{ metricValue( summary.downloadsPerHundredVisits ) }</Typography>
          <Typography component="p" data-kind="hint">Interest signal, not a unique-user conversion</Typography>
        </Metric>
      </MetricBand>

      <AudienceBody>
        <ChartRegion>
          { databaseAvailable && visits.length ? (
            <LineChart
              data={ visits }
              dataKey="count"
              name="Visits"
              height={ 260 }
              ariaLabel={ `Visit trend for ${periodLabel.toLowerCase()}` }
            />
          ) : (
            <ClearState role="status" sx={ { minHeight: 260 } }>
              <Box>
                <BarChartRoundedIcon aria-hidden="true" />
                <Typography component="p">{ databaseAvailable ? 'No audience activity yet' : 'Live analytics unavailable' }</Typography>
                <Typography component="p">{ databaseAvailable ? 'Visit data will appear here for this period.' : 'Content tools remain available while the database reconnects.' }</Typography>
              </Box>
            </ClearState>
          ) }
        </ChartRegion>

        <TopPagesRegion>
          <Typography component="h3">Top Public Pages</Typography>
          { topPages.length ? (
            <TopPageList component="ol">
              { topPages.map( page => (
                <TopPageRow component="li" key={ page.path }>
                  <Box>
                    <Typography component="p">{ page.path || '/' }</Typography>
                    <Typography component="p">{ numberFormatter.format( page.count ) }</Typography>
                  </Box>
                  <PageProgress
                    variant="determinate"
                    value={ ( page.count / largestPageCount ) * 100 }
                    aria-label={ `${page.path || 'Home'}: ${page.count} visits` }
                  />
                </TopPageRow>
              ) ) }
            </TopPageList>
          ) : (
            <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.72rem', lineHeight: 1.5 } }>
              No page-level activity is available for this period.
            </Typography>
          ) }
        </TopPagesRegion>
      </AudienceBody>
    </AudienceSurface>
  );
}
