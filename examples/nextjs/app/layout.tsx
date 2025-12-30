'use client';

import React from 'react';
import './globals.css';
import '@react-code-view/react/styles/index.css';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>React Code View · Next.js Example</title>
        <meta name="description" content="Demo of react-code-view in a Next.js (App Router) project" />
      </head>
      <body>
        <div style={{ minHeight: '100vh' }}>
          <nav style={{
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 40px',
            display: 'flex',
            gap: '20px',
            backgroundColor: '#f9fafb'
          }}>
            <Link
              href="/unplugin"
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: pathname === '/unplugin' ? '#007bff' : 'transparent',
                color: pathname === '/unplugin' ? 'white' : '#1f2937',
                border: 'none',
                borderRadius: '6px',
                fontWeight: pathname === '/unplugin' ? 'bold' : 'normal',
                textDecoration: 'none'
              }}
            >
              📦 Unplugin Demo
            </Link>
            <Link
              href="/basic"
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: pathname === '/basic' ? '#007bff' : 'transparent',
                color: pathname === '/basic' ? 'white' : '#1f2937',
                border: 'none',
                borderRadius: '6px',
                fontWeight: pathname === '/basic' ? 'bold' : 'normal',
                textDecoration: 'none'
              }}
            >
              ⚡ Basic Usage
            </Link>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
