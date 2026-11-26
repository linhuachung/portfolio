import AnalyticsTracker from '@/components/AnalyticsTracker';
import Header from '@/components/Header';
import { LINKS } from '@/constants/route';
import { PublicShell, SkipLink, ViewportMain } from '@/app/(user)/components/PublicLayout.styles';
import localFont from 'next/font/local';

const geistSans = localFont( { src: './fonts/GeistVF.woff', variable: '--font-portfolio-sans', display: 'swap' } );
const geistMono = localFont( { src: './fonts/GeistMonoVF.woff', variable: '--font-portfolio-mono', display: 'swap' } );

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
