'use client';

import React from 'react';
import { CodeView } from '@react-code-view/react';
import UnpluginDemo from '../docs/unplugin-demo.md';

const code = `const Hello = () => <button onClick={() => alert('Hi from Next.js!')}>Click me</button>;

render(<Hello />);`;

export default function RcvDemoPage() {
  return (
    <main style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1>React Code View - Next.js Demo</h1>
      
      <section style={{ marginBottom: 32 }}>
        <h2>Unplugin Markdown Demo</h2>
        <p style={{ margin: '0 0 16px' }}>
          This demo is imported from a markdown file using <code>@react-code-view/unplugin</code>
        </p>
        <UnpluginDemo 
          theme="rcv-theme-default"
          dependencies={{ useState: React.useState }}
        />
      </section>

      <section>
        <h2>Basic CodeView Example</h2>
        <p style={{ margin: '0 0 16px' }}>
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
      </section>
    </main>
  );
}
