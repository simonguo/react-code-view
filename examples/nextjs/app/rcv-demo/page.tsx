'use client';

import React from 'react';
import { CodeView } from '@react-code-view/react';

const code = `const Hello = () => <button onClick={() => alert('Hi from Next.js!')}>Click me</button>;

render(<Hello />);`;

export default function RcvDemoPage() {
  return (
    <main style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1>React Code View Demo</h1>
      <p style={{ margin: 0 }}>
        Live editing and preview inside a Next.js (App Router) page.
      </p>
      <CodeView
        language="tsx"
        theme="rcv-theme-default"
        renderPreview
        showCopyButton
        dependencies={{ React }}
        defaultShowCode
      >
        {code}
      </CodeView>
    </main>
  );
}
