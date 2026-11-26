'use client';

import { usePathname } from 'next/navigation';
import { AdminShell } from '@/features/admin-shell/styles/Admin.styles';
import localFont from 'next/font/local';
import AdminNavigationShell from '@/features/admin-shell/components/AdminNavigationShell';

const adminSans = localFont( { src: '../../../shared/assets/fonts/GeistVF.woff', display: 'swap' } );
const adminMono = localFont( { src: '../../../shared/assets/fonts/GeistMonoVF.woff', display: 'swap' } );

export default function AdminLayout( { children } ) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  return (
    <AdminShell $sansFont={ adminSans.style.fontFamily } $monoFont={ adminMono.style.fontFamily }>
      { isLogin ? children : <AdminNavigationShell>{ children }</AdminNavigationShell> }
    </AdminShell>
  );
}
