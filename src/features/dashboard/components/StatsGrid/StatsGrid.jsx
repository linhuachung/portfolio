'use client';
import StatCard from '@/features/dashboard/components/StatCard';
import Box from '@mui/material/Box';
import { StatsGridRoot } from '@/features/admin-shell/styles/Admin.styles';

export default function StatsGrid( { stats, statsConfig } ) {
  return (
    <StatsGridRoot>
      { statsConfig.map( stat => (
        <Box key={ stat.key }>
          <StatCard
            title={ stat.title }
            value={ stats[stat.key] || 0 }
            icon={ stat.icon }
            color={ stat.color }
          />
        </Box>
      ) ) }
    </StatsGridRoot>
  );
}

