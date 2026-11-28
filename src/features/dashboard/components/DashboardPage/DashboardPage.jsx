'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ActionQueue from '../ActionQueue';
import AudienceOverview from '../AudienceOverview';
import ContentHealth from '../ContentHealth';
import DashboardHeader from '../DashboardHeader';
import OverviewLoading from '../OverviewLoading';
import RecentContacts from '../RecentContacts';
import { OperationsGrid, OverviewPage } from '../../styles/Overview.styles';
import { useDashboard } from '../../hooks/useDashboard';

export default function Dashboard() {
  const {
    loading,
    refreshing,
    period,
    dashboardData,
    error,
    handleRefresh,
    handlePeriodChange
  } = useDashboard();

  if ( loading ) {return <OverviewLoading />;}
  if ( !dashboardData ) {return (
    <OverviewPage>
      <DashboardHeader
        generatedAt={ null }
        onRefresh={ handleRefresh }
        refreshing={ refreshing }
      />
      <Alert
        severity="error"
        variant="outlined"
        action={ <Button color="inherit" size="small" onClick={ handleRefresh }>Try Again</Button> }
      >
        { error || 'Dashboard data is unavailable. Try again.' }
      </Alert>
    </OverviewPage>
  );}

  const {
    stats = {},
    charts = {},
    actionQueue = [],
    contentSummary = {},
    recentContacts = [],
    meta = {}
  } = dashboardData;
  const databaseAvailable = meta.databaseAvailable === true;

  return (
    <OverviewPage>
      <DashboardHeader
        generatedAt={ meta.generatedAt }
        onRefresh={ handleRefresh }
        refreshing={ refreshing }
      />

      { error && (
        <Alert
          severity="error"
          variant="outlined"
          action={ <Button color="inherit" size="small" onClick={ handleRefresh }>Try Again</Button> }
        >
          { error }
        </Alert>
      ) }

      { !databaseAvailable && (
        <Alert severity="warning" variant="outlined">
          Live inbox and audience data are unavailable. Publishing checks and public previews remain available.
        </Alert>
      ) }

      <OperationsGrid>
        <ActionQueue items={ actionQueue } sx={ { gridArea: 'attention' } } />
        <RecentContacts contacts={ recentContacts } pendingCount={ stats.pendingContacts || 0 } sx={ { gridArea: 'inbox' } } />
        <ContentHealth summary={ contentSummary } sx={ { gridArea: 'content' } } />
      </OperationsGrid>

      <AudienceOverview
        charts={ charts }
        databaseAvailable={ databaseAvailable }
        period={ period }
        onPeriodChange={ handlePeriodChange }
      />
    </OverviewPage>
  );
}
