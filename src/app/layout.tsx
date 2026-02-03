import { FC, PropsWithChildren } from 'react';

import { Manrope } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';
import { Github } from '@/components/Github';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ball of Glass with Physics and Attraction / Three.js / R3F / Rapier',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={manrope.className}>
    <body>
      {children}

      <Github />
    </body>
  </html>
);

export default RootLayout;
