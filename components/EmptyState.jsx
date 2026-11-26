'use client';
import Box from '@mui/material/Box';

export default function EmptyState( { message = 'No data available', height = 300 } ) {
  return (
    <Box sx={ { minHeight: typeof height === 'number' ? height : 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' } }>
      { message }
    </Box>
  );
}

