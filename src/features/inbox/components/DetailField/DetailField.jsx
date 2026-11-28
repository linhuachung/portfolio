'use client';

import Box from '@mui/material/Box';
import { DetailLabel } from './DetailField.styles';

export default function DetailField( { label, children } ) {
  return (
    <Box>
      <DetailLabel component="p">{ label }</DetailLabel>
      { children }
    </Box>
  );
}
