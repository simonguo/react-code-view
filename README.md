# React Code View

[![npm](https://img.shields.io/npm/v/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)
[![npm](https://img.shields.io/npm/dm/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A React component library for rendering code with **live preview** and syntax highlighting.

**✨ Highlight:** Import `.md` files as React components - write markdown, get interactive demos instantly!

[Docs](https://rcv-rsuite.vercel.app/)

## ✨ Features

- 📝 **Native Markdown Parsing** - Import `.md` files and render embedded code blocks as interactive components
- 🎨 **Live Preview** - Execute and preview React code in real-time
- ✏️ **Editable Code** - Built-in code editor with syntax highlighting
- 🔌 **Universal Plugin** - Works with Webpack, Vite, Rollup, esbuild, and Rspack
- 🎯 **TypeScript** - Full TypeScript support out of the box
- 📦 **Tree-shakeable** - Import only what you need
- ⚡ **Zero Config** - Works out of the box with sensible defaults

## ✅ Requirements

- Node.js >= 18
- PNPM >= 8 (monorepo managed via PNPM + Turbo)

## 📦 Installation

```bash
# npm
npm install @react-code-view/react

# pnpm
pnpm add @react-code-view/react

# yarn
yarn add @react-code-view/react
```

## 🚀 Quick Start

### ⭐ Import Markdown as React Components

The most convenient way - configure once, use everywhere!

**1. Configure your build tool** (Vite example):

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCodeView from '@react-code-view/unplugin/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView() // That's it!
  ]
});
```

**2. Create your markdown file** (`demo.md`):

```markdown
# Interactive Counter

Here's a live counter component:

<!--start-code-->
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
render(<Counter />);
\`\`\`
<!--end-code-->

The code above is **fully interactive**!
```

**3. Import and use like any React component**:

```tsx
import Demo from './demo.md';

function App() {
  return <Demo />;
}
```

**That's it!** 🎉 Your markdown is now a React component with:
- ✅ Live, interactive code blocks
- ✅ Automatic syntax highlighting
- ✅ Type-safe imports
- ✅ Full TypeScript support

### Alternative: Runtime Parsing (No Build Config)

If you prefer not to configure a build tool:

```tsx
import { CodeView } from '@react-code-view/react';
import markdown from './demo.md?raw';

<CodeView dependencies={{ useState: React.useState }}>
  {markdown}
</CodeView>
```

### Basic Code Preview

For simple code snippets without markdown:

```tsx
import { CodeView } from '@react-code-view/react';

const code = `
<button onClick={() => alert('Hello!')}>
  Click me
</button>
`;

<CodeView language="jsx" editable renderPreview>
  {code}
</CodeView>
```

## 📚 Packages

This monorepo contains the following packages:

| Package | Version | Description |
|---------|---------|-------------|
| [`@react-code-view/react`](./packages/react) | [![npm](https://img.shields.io/npm/v/@react-code-view/react.svg)](https://www.npmjs.com/package/@react-code-view/react) | React components |
| [`@react-code-view/core`](./packages/core) | [![npm](https://img.shields.io/npm/v/@react-code-view/core.svg)](https://www.npmjs.com/package/@react-code-view/core) | Core transformation utilities |
| [`@react-code-view/unplugin`](./packages/unplugin) | [![npm](https://img.shields.io/npm/v/@react-code-view/unplugin.svg)](https://www.npmjs.com/package/@react-code-view/unplugin) | Build tool plugins |

## 🔧 Build Tool Integration

React Code View supports all major build tools through [unplugin](https://github.com/unjs/unplugin).

Once configured, you can **import `.md` files as React components** - the most convenient way to create interactive documentation!

**Why this is amazing:**
- 📝 Write markdown files with code examples
- 🎯 Import them like regular React components
- ⚡ Get live, interactive demos automatically
- 🔒 Full TypeScript support and type safety
- 🎨 Pass props like `theme`, `dependencies`, etc.

**Example:**

```tsx
import Demo from './example.md';

function App() {
  return (
    <div>
      <Demo theme="rcv-theme-dark" />
    </div>
  );
}
```

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
| `children` | `string` | - | Source code or markdown content to display |
| `dependencies` | `object` | `{}` | Dependencies for code execution (e.g., `{ useState: React.useState }`) |
| `language` | `string` | `'jsx'` | Syntax highlighting language |
| `editable` | `boolean` | `true` | Enable code editing |
| `renderPreview` | `boolean` | `true` | Show live preview |
| `showLineNumbers` | `boolean` | `true` | Show line numbers |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `defaultShowCode` | `boolean` | `false` | Initially show code section |
| `theme` | `string` | `'rcv-theme-default'` | Theme class name |
| `beforeCompile` | `function` | - | Transform code before compile |
| `afterCompile` | `function` | - | Transform code after compile |
| `onChange` | `function` | - | Callback when code changes |
| `onError` | `function` | - | Callback when error occurs |
| `emptyPreviewContent` | `ReactNode` | - | Content to display when preview is empty |

**Note:** When `children` contains markdown with `<!--start-code-->` markers, CodeView automatically parses and renders code blocks as interactive components.

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

- New packages: The project is now a PNPM monorepo with `@react-code-view/react`, `@react-code-view/core`, and `@react-code-view/unplugin`.
- Component imports: Use `@react-code-view/react` for all React components.
  - Before (v2): `import { CodeView } from 'react-code-view'`
  - After (v3+): `import { CodeView } from '@react-code-view/react'`
- Styles: Use the new CSS entry points.
  - Before (v2): Less files (e.g., `react-code-view/less/styles.less`)
  - After (v3+): `import '@react-code-view/react/styles'`
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
