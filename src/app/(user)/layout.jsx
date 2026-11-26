import AnalyticsTracker from '@/features/analytics/components/AnalyticsTracker';
import Header from '@/features/portfolio/components/Header';
import { LINKS } from '@/features/portfolio/constants/navigation';
import { PublicShell, SkipLink, ViewportMain } from '@/features/portfolio/styles/PublicLayout.styles';
import localFont from 'next/font/local';

const geistSans = localFont( { src: '../../shared/assets/fonts/GeistVF.woff', variable: '--font-portfolio-sans', display: 'swap' } );
const geistMono = localFont( { src: '../../shared/assets/fonts/GeistMonoVF.woff', variable: '--font-portfolio-mono', display: 'swap' } );

export default function RootLayout( { children } ) {
  return (
    <PublicShell $sansFont={ geistSans.style.fontFamily } $monoFont={ geistMono.style.fontFamily }>
      <AnalyticsTracker />
      <SkipLink href="#main-content">Skip to content</SkipLink>
      <Header links={ LINKS } />
      <ViewportMain component="main" id="main-content" tabIndex="-1">
        { children }
      </ViewportMain>
    </PublicShell>
  );
}
