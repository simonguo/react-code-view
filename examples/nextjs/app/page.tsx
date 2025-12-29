'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Next.js + React Code View</h1>
      <p style={{ margin: '12px 0 20px' }}>
        This is a minimal Next.js example showing how to embed react-code-view.
      </p>
      <Link
        href="/rcv-demo"
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          background: '#111827',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        View Demo
      </Link>
    </main>
  );
}
