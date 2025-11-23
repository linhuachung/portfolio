'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMenuFries } from 'react-icons/ci';

function MobileNav( { links, isAdmin, title } ) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent-light dark:text-accent"/>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-[#f5f5f5] dark:bg-primary">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/"
            className="text-4xl font-semibold text-gray-900 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all group">
            { !isAdmin ? 'Chung' : title }
            <span className="text-accent-light dark:text-accent group-hover:text-gray-900 dark:group-hover:text-white">.</span>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          { links.map( ( { name, path } ) => {
            return <Link
              href={ path }
              key={ path }
              className={ `${path === pathname && 'text-accent-light dark:text-accent border-b-2 border-accent-light dark:border-accent'} text-xl capitalize text-gray-700 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all` }
            >
              { name }
            </Link>;
          } ) }
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;