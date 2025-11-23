import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/app/StoreProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';

const jetbrainsMono = JetBrains_Mono( {
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono'
} );

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'ChungLH Portfolio',
  description: 'Hi! I\'m Lin Hua Chung, a Frontend Developer specializing in modern web technologies. Check out my projects and skills!'
};

export default function RootLayout( { children } ) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={ {
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
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
      <body
        className={ jetbrainsMono.variable }
      >
        <ThemeProvider>
          <StoreProvider>
            { children }
            <ToastContainer/>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
