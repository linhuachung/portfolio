'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { locales } from '@/i18n';
import { Button } from '@/components/ui/button';

const languageNames = {
  en: 'EN',
  vi: 'VI'
};

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = ( newLocale ) => {
    router.replace( pathname, { locale: newLocale } );
  };

  return (
    <div className="flex items-center gap-2">
      { locales.map( ( loc ) => (
        <Button
          key={ loc }
          variant={ locale === loc ? 'default' : 'outline' }
          size="sm"
          onClick={ () => switchLocale( loc ) }
          className="min-w-[50px]"
        >
          { languageNames[loc] || loc.toUpperCase() }
        </Button>
      ) ) }
    </div>
  );
}

export default LanguageSwitcher;
