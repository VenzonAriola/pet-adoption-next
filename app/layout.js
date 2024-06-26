import { ClerkProvider } from '@clerk/nextjs';

import { Roboto } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';

const inter = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
