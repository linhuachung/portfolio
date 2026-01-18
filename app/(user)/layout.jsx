import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';
import StairTransition from '@/components/StairTransition';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { LINKS } from '@/constants/route';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { defaultLocale } from '@/i18n';

export default async function RootLayout( { children } ) {
  const messages = await getMessages( { locale: defaultLocale } );

  return (
    <NextIntlClientProvider messages={ messages } locale={ defaultLocale }>
      <AnalyticsTracker/>
      <Header
        links={ LINKS }
      />
      <StairTransition/>
      <PageTransition>
        { children }
      </PageTransition>
    </NextIntlClientProvider>
  );
}
