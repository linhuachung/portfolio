'use client';

import BarChart from '@/components/admin/BarChart';
import LineChart from '@/components/admin/LineChart';
import PieChart from '@/components/admin/PieChart';
import ChartContainer from '@/components/ChartContainer';
import Loader from '@/components/Loader';
import DashboardHeader from './components/DashboardHeader';
import RecentContacts from './components/RecentContacts';
import StatsGrid from './components/StatsGrid';
import { STATS_CONFIG } from './constants/dashboardConfig';
import { useDashboard } from './hooks/useDashboard';

export default function Dashboard() {
  const {
    loading,
    refreshing,
    period,
    dashboardData,
    handleRefresh,
    handlePeriodChange
  } = useDashboard();

  if ( loading ) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader type="ClipLoader" color="#00ff99" size={ 50 } />
      </div>
    );
  }

  const { stats = {}, charts = {}, recentContacts = [] } = dashboardData || {};

  return (
    <div className="container mx-auto p-6 space-y-6">
      <DashboardHeader
        period={ period }
        onPeriodChange={ handlePeriodChange }
        onRefresh={ handleRefresh }
        refreshing={ refreshing }
      />

      <StatsGrid stats={ stats } statsConfig={ STATS_CONFIG } />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Visits Over Time"
          data={ charts.visits }
          emptyMessage="No visit data available"
          delay={ 0.3 }
        >
          <LineChart
            data={ charts.visits }
            dataKey="count"
            name="Visits"
            color="#00ff99"
          />
        </ChartContainer>

        <ChartContainer
          title="CV Downloads Over Time"
          data={ charts.cvDownloads }
          emptyMessage="No download data available"
          delay={ 0.4 }
        >
          <LineChart
            data={ charts.cvDownloads }
            dataKey="count"
            name="Downloads"
            color="#3b82f6"
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Top Visited Pages"
          data={ charts.visitsByPath }
          emptyMessage="No page visit data available"
          delay={ 0.5 }
        >
          <BarChart
            data={ charts.visitsByPath }
            dataKey="count"
            name="Visits"
            color="#8b5cf6"
          />
        </ChartContainer>

        <ChartContainer
          title="Projects by Category"
          data={ charts.projectsByCategory }
          emptyMessage="No project data available"
          delay={ 0.6 }
        >
          <PieChart
            data={ charts.projectsByCategory }
            dataKey="count"
            nameKey="category"
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Contacts by Status"
          data={ charts.contactsByStatus }
          emptyMessage="No contact data available"
          delay={ 0.7 }
        >
          <PieChart
            data={ charts.contactsByStatus }
            dataKey="count"
            nameKey="status"
          />
        </ChartContainer>

        <RecentContacts contacts={ recentContacts } delay={ 0.8 } />
      </div>
    </div>
  );
}
