# Next.js Example

This folder documents how to use **react-code-view** in a Next.js (App Router) project.

## 1) Create a Next.js app

```bash
pnpm create next-app my-rcv-app --ts --eslint
cd my-rcv-app
```

## 2) Install react-code-view

```bash
pnpm add @react-code-view/react @react-code-view/core
```

## 3) Add styles (global)

In `app/layout.tsx` (or `pages/_app.tsx` for Pages Router):

```tsx
import '@react-code-view/react/styles/index.css';
```

## 4) Add a demo page (App Router)

Create `app/rcv-demo/page.tsx`:

```tsx
'use client';

import React from 'react';
import { CodeView } from '@react-code-view/react';

const code = `const Hello = () => <button onClick={() => alert('hi')}>Click</button>;
render(<Hello />);`;

export default function RcvDemoPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>React Code View in Next.js</h1>
      <CodeView
        language="tsx"
        theme="rcv-theme-default"
        renderPreview
        showCopyButton
        dependencies={{ React }}
      >
        {code}
      </CodeView>
    </main>
  );
}
```

> If you prefer Pages Router, create `pages/rcv-demo.tsx` with the same content (remove `'use client';` if your project defaults to client components).

## 5) Run

```bash
pnpm dev
# visit http://localhost:3000/rcv-demo
```

## Notes
- No extra Next.js config is required; the package ships ESM/CJS builds consumable by Next.
- Ensure the page/component using `CodeView` is a **client component** (`'use client'`) so hooks can run.
- Import the CSS once (in layout or custom App). You can override CSS variables if needed.
- To customize themes, set the `theme` prop (e.g., `rcv-theme-dark`) and override CSS variables in your global stylesheet.
