import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return locales.map( ( locale ) => ( { locale } ) );
}

export default async function LocaleLayout( {
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
} ) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if ( !locales.includes( locale ) ) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale( locale );

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={ messages }>
      { children }
    </NextIntlClientProvider>
  );
}
