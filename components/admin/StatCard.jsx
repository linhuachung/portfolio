'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { motion } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';

const colorMap = {
  accent: 'primary.main',
  blue: 'info.main',
  green: 'success.main',
  purple: 'secondary.main',
  orange: 'warning.main'
};

const Card = styled( Box, { shouldForwardProp: property => property !== '$color' } )( ( { theme, $color } ) => {
  const palettePath = colorMap[$color] || colorMap.accent;
  const [key, shade] = palettePath.split( '.' );
  const value = theme.palette[key]?.[shade] || theme.palette.primary.main;
  return {
    padding: theme.spacing( 2.25 ),
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    color: value,
    backgroundColor: 'transparent',
    '& [data-stat-icon]': {
      borderColor: alpha( value, .25 ),
      backgroundColor: alpha( value, .07 )
    }
  };
} );

export default function StatCard( { title, value, icon: Icon, color = 'accent', trend, trendValue } ) {
  return (
    <Card
      component={ motion.div }
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.22 } }
      $color={ color }
    >
      <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 } }>
        <Box data-stat-icon sx={ { display: 'grid', placeItems: 'center', width: 36, height: 36, border: 1, borderRadius: 2, '& svg': { fontSize: '1.15rem' } } }>
          { Icon && <Icon/> }
        </Box>
        { trend && (
          <Box sx={ { fontSize: '.875rem', color: trend === 'up' ? 'success.main' : 'error.main' } }>
            { trend === 'up' ? '↑' : '↓' } { trendValue }%
          </Box>
        ) }
      </Box>
      <Typography component="h3" sx={ { mb: .75, color: 'text.secondary', fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.64rem', fontWeight: 650, letterSpacing: '.07em', textTransform: 'uppercase' } }>{ title }</Typography>
      <Box sx={ { color: 'text.primary', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 650, letterSpacing: '-.045em', lineHeight: 1 } }>
        { Number( value || 0 ).toLocaleString( 'en-US' ) }
      </Box>
    </Card>
  );
}

