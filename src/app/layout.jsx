import { ToastHost } from '@/shared/components/Toast';
import MuiProvider from '@/shared/providers/MuiProvider';
import ThemeProvider from '@/shared/providers/ThemeProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono( {
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono'
} );

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: {
    default: 'Lin Hua Chung — Frontend Engineer',
    template: '%s — Lin Hua Chung'
  },
  description: 'Frontend Engineer focused on complex forms, API-driven workflows, and product interfaces for banking and commerce.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout( { children } ) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={ {
            __html: `
              (function() {
                const defaultTheme = window.location.pathname.startsWith('/admin') ? 'dark' : 'light';
                const storedTheme = localStorage.getItem('theme');
                const theme = ['light', 'dark'].includes(storedTheme) ? storedTheme : defaultTheme;
                document.documentElement.style.colorScheme = theme;
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `
          } }
        />
      </head>
      <body>
        <ThemeProvider>
          <AppRouterCacheProvider>
            <MuiProvider fontFamily={ jetbrainsMono.style.fontFamily }>
              { children }
              <ToastHost/>
            </MuiProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
