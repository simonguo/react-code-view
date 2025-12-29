# React Code View

[![npm](https://img.shields.io/npm/v/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)
[![npm](https://img.shields.io/npm/dm/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A React component library for rendering code with **live preview** and syntax highlighting.

[Docs](https://react-code-view-rsuite.vercel.app/)

## ✨ Features

- 🎨 **Live Preview** - Execute and preview React code in real-time
- ✏️ **Editable Code** - Built-in code editor with syntax highlighting
- 📝 **Markdown Support** - Render markdown content with code blocks
- 🔌 **Universal Plugin** - Works with Webpack, Vite, Rollup, esbuild, and Rspack
- 🎯 **TypeScript** - Full TypeScript support out of the box
- 📦 **Tree-shakeable** - Import only what you need

## ✅ Requirements

- Node.js >= 18
- PNPM >= 8 (monorepo managed via PNPM + Turbo)

## 📦 Installation

```bash
# npm
npm install react-code-view

# pnpm
pnpm add react-code-view

# yarn
yarn add react-code-view
```

## 🚀 Quick Start

```tsx
import CodeView from 'react-code-view';
import 'react-code-view/styles';

function App() {
  const code = `
<button onClick={() => alert('Hello!')}>
  Click me
</button>
  `.trim();

  return (
    <CodeView 
      language="jsx"
      editable
      renderPreview
    >
      {code}
    </CodeView>
  );
}
```

## 📚 Packages

This monorepo contains the following packages:

| Package | Version | Description |
|---------|---------|-------------|
| [`react-code-view`](./packages/react-code-view) | [![npm](https://img.shields.io/npm/v/react-code-view.svg)](https://www.npmjs.com/package/react-code-view) | Main package (re-exports all) |
| [`@react-code-view/react`](./packages/react) | [![npm](https://img.shields.io/npm/v/@react-code-view/react.svg)](https://www.npmjs.com/package/@react-code-view/react) | React components |
| [`@react-code-view/core`](./packages/core) | [![npm](https://img.shields.io/npm/v/@react-code-view/core.svg)](https://www.npmjs.com/package/@react-code-view/core) | Core transformation utilities |
| [`@react-code-view/unplugin`](./packages/unplugin) | [![npm](https://img.shields.io/npm/v/@react-code-view/unplugin.svg)](https://www.npmjs.com/package/@react-code-view/unplugin) | Build tool plugins |

## 🔧 Build Tool Integration

React Code View supports all major build tools through [unplugin](https://github.com/unjs/unplugin):

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCodeView from '@react-code-view/unplugin/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView()
  ]
});
```

### Webpack

```js
// webpack.config.js
const ReactCodeViewPlugin = require('@react-code-view/unplugin/webpack');

module.exports = {
  plugins: [
    ReactCodeViewPlugin()
  ]
};
```

### Rollup

```js
// rollup.config.js
import reactCodeView from '@react-code-view/unplugin/rollup';

export default {
  plugins: [
    reactCodeView()
  ]
};
```

### esbuild

```js
import * as esbuild from 'esbuild';
import reactCodeView from '@react-code-view/unplugin/esbuild';

await esbuild.build({
  plugins: [
    reactCodeView()
  ]
});
```

### Rspack

```js
// rspack.config.js
const ReactCodeViewPlugin = require('@react-code-view/unplugin/rspack');

module.exports = {
  plugins: [
    ReactCodeViewPlugin()
  ]
};
```

## 📖 API Reference

### CodeView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | - | Source code to display |
| `dependencies` | `object` | `{}` | Dependencies for code execution |
| `language` | `string` | `'jsx'` | Syntax highlighting language |
| `editable` | `boolean` | `true` | Enable code editing |
| `renderPreview` | `boolean` | `true` | Show live preview |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `theme` | `string` | `'rcv-theme-default'` | Theme class name |
| `beforeCompile` | `function` | - | Transform code before compile |
| `afterCompile` | `function` | - | Transform code after compile |
| `onChange` | `function` | - | Callback when code changes |
| `onError` | `function` | - | Callback when error occurs |

### Other Components

- **`Renderer`** - Syntax-highlighted code display
- **`MarkdownRenderer`** - Render markdown with syntax highlighting
- **`CodeEditor`** - Editable code component
- **`Preview`** - Display executed code output
- **`CopyCodeButton`** - Copy code to clipboard button
- **`ErrorBoundary`** - Error boundary for code execution

### Hooks

- **`useCodeExecution`** - Execute code and capture a rendered element

  Example:

  ```tsx
  import { useCodeExecution } from '@react-code-view/react';

  export function LivePreview({ source }: { source: string }) {
    const { element, error, code, updateCode } = useCodeExecution(source, {
      // Optional: inject deps into runtime scope
      dependencies: { alert },
      // Optional: configure transforms (e.g. TS + JSX)
      transformOptions: { transforms: ['typescript', 'jsx'] },
      beforeCompile: (c) => c.trim(),
      afterCompile: (c) => c,
      onError: (e) => console.error('Execution error:', e)
    });

    return (
      <div>
        <textarea value={code} onChange={(e) => updateCode(e.target.value)} />
        {error ? <div role="alert">{String(error.message || error)}</div> : element}
      </div>
    );
  }
  ```

## 🎨 Theming

Import the base styles:

```tsx
import 'react-code-view/styles';
```

Use theme classes:

```tsx
// Light theme (default)
<CodeView theme="rcv-theme-default">...</CodeView>

// Dark theme
<CodeView theme="rcv-theme-dark">...</CodeView>
```

Customize with CSS variables:

```css
.rcv-code-view {
  --rcv-color-bg: #ffffff;
  --rcv-color-bg-code: #f6f8fa;
  --rcv-color-text: #24292f;
  --rcv-color-border: #d0d7de;
  --rcv-color-primary: #0969da;
  --rcv-color-error: #cf222e;
}
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages (turbo)
pnpm build

# Start docs dev server (Vite)
pnpm docs

# Run tests (Vitest in each package)
pnpm test

# Lint code (ESLint)
pnpm lint

## 🤖 CI/CD

- CI runs on Node 18+ and uses PNPM and Turbo to install, type-check, build, and test the monorepo.
- Docs are built with Vite and deployed to GitHub Pages from `docs/dist`.

## 🔄 Migration Guide (v2 → v3)

Major changes in v3.0.0 modernize the architecture and usage. Here’s how to update:

- New packages: The project is now a PNPM monorepo with `@react-code-view/react`, `@react-code-view/core`, and `@react-code-view/unplugin`. The `react-code-view` package re-exports everything for convenience.
- Component imports: Prefer `react-code-view` for quick usage, or import directly from `@react-code-view/react` for granular control.
  - Before (v2): `import { CodeView } from 'react-code-view'`
  - After (v3): `import CodeView from 'react-code-view'` or `import { CodeView } from '@react-code-view/react'`
- Styles: Use the new CSS entry points.
  - Before (v2): Less files (e.g., `react-code-view/less/styles.less`)
  - After (v3): `import 'react-code-view/styles'` and optional syntax theme `import 'react-code-view/styles/highlight'`
- Build tool integration: Replace legacy Webpack markdown loader with the unified unplugin across tools.
  - Before (v2): `webpack-md-loader` and custom loader config
  - After (v3): `@react-code-view/unplugin` for Vite/Webpack/Rollup/esbuild/Rspack (see examples above)
- Hook behavior: `useCodeExecution` is stabilized to avoid unintended re-executions.
  - New: `updateCode` alias for code changes; pass `dependencies` explicitly if runtime scope is needed
  - If you relied on implicit re-runs via changing options, update to change `code` or manage your own triggers
- Types & tests: Vitest + jest-dom types included via package `tsconfig.json`.
  - Add `types: ['vitest/globals', '@testing-library/jest-dom']` if customizing your test config

If you need help migrating specific code paths from v2, open an issue and we’ll guide you through it.
```

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

[MIT](./LICENSE) © [Simon Guo](https://github.com/simonguo)
