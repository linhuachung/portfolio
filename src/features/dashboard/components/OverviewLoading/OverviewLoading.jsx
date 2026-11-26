'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  OperationsGrid,
  OverviewPage,
  SkeletonSurface
} from '../../styles/Overview.styles';

function SurfaceSkeleton( { height, sx } ) {
  const reduceMotion = useMediaQuery( '(prefers-reduced-motion: reduce)', { noSsr: true } );
  const animation = reduceMotion ? false : 'pulse';
  return (
    <SkeletonSurface aria-hidden="true" sx={ sx }>
      <Skeleton animation={ animation } variant="text" width="32%" height={ 28 } />
      <Skeleton animation={ animation } variant="text" width="58%" />
      <Skeleton animation={ animation } variant="rounded" width="100%" height={ height } />
    </SkeletonSurface>
  );
}

export default function OverviewLoading() {
  const reduceMotion = useMediaQuery( '(prefers-reduced-motion: reduce)', { noSsr: true } );
  const animation = reduceMotion ? false : 'pulse';
  return (
    <OverviewPage aria-busy="true" aria-label="Loading overview">
      <Box sx={ { display: 'grid', gap: 1, pb: 2.5, borderBottom: 1, borderColor: 'divider' } }>
        <Skeleton animation={ animation } variant="text" width={ 110 } />
        <Skeleton animation={ animation } variant="text" width={ 220 } height={ 48 } />
        <Skeleton animation={ animation } variant="text" width="min(100%, 520px)" />
      </Box>
      <OperationsGrid>
        <SurfaceSkeleton height={ 160 } sx={ { gridArea: 'attention' } } />
        <SurfaceSkeleton height={ 300 } sx={ { gridArea: 'inbox' } } />
        <SurfaceSkeleton height={ 90 } sx={ { gridArea: 'content' } } />
      </OperationsGrid>
      <SurfaceSkeleton height={ 320 } />
    </OverviewPage>
  );
}
