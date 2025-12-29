import React from 'react';
import './globals.css';
import '@react-code-view/react/styles/index.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'React Code View · Next.js Example',
  description: 'Demo of react-code-view in a Next.js (App Router) project'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <header className="site-header">
            <div className="logo">React Code View × Next.js</div>
            <a className="link" href="/rcv-demo">Open Demo</a>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
