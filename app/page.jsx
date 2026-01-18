import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// This page will redirect to default locale
export default function RootPage() {
  redirect( `/${routing.defaultLocale}` );
}
