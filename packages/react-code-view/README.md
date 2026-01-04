# react-code-view

A React component library for rendering code with live preview and syntax highlighting.

[![npm](https://img.shields.io/npm/v/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)
[![npm](https://img.shields.io/npm/dm/react-code-view.svg)](https://www.npmjs.com/package/react-code-view)

## Features

- 🎨 **Live Preview** - Execute and preview React code in real-time
- ✨ **Syntax Highlighting** - Powered by Shiki
- ✏️ **Editable Code** - Built-in code editor with optional CodeMirror support
- 📝 **Markdown Support** - Render markdown with code blocks
- 🔌 **Universal Plugin** - Works with Webpack, Vite, Rollup, esbuild, and Rspack
- 🎯 **TypeScript** - Full TypeScript support
- 📦 **Tree-shakeable** - Import only what you need

## Installation

```bash
# Using pnpm (recommended)
pnpm add react-code-view

# Using npm
npm install react-code-view

# Using yarn
yarn add react-code-view
```

## Quick Start

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
    <CodeView language="jsx">
      {code}
    </CodeView>
  );
}
```

## Packages

This project is organized as a monorepo with the following packages:

| Package | Description |
|---------|-------------|
| [`react-code-view`](./packages/react-code-view) | Main package (re-exports all) |
| [`@react-code-view/react`](./packages/react) | React components |
| [`@react-code-view/core`](./packages/core) | Core transformation utilities |
| [`@react-code-view/unplugin`](./packages/unplugin) | Build tool plugins |

## Usage with Build Tools

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

### Other Build Tools

See [@react-code-view/unplugin](./packages/unplugin) for Rollup, esbuild, and Rspack support.

## Components

### CodeView

The main component for displaying and executing React code.

```tsx
import { CodeView } from 'react-code-view';

<CodeView
  dependencies={{ Button, Icon }}
  language="jsx"
  editable={true}
  renderPreview={true}
  showLineNumbers={true}
  showCopyButton={true}
  theme="rcv-theme-dark"
  onChange={(code) => console.log(code)}
  onError={(error) => console.error(error)}
>
  {sourceCode}
</CodeView>
```

### Renderer

Static syntax-highlighted code display.

```tsx
import { Renderer } from 'react-code-view';

<Renderer code={code} language="typescript" />
```

### MarkdownRenderer

Render markdown content with syntax highlighting.

```tsx
import { MarkdownRenderer } from 'react-code-view';

<MarkdownRenderer>{markdownContent}</MarkdownRenderer>
```

## Theming

Import the base styles:

```tsx
import 'react-code-view/styles';
// or specific files
import 'react-code-view/styles/index.css';
import 'react-code-view/styles/highlight.css';
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
}
```

## API Reference

See [API Documentation](./docs/api.md) for complete API reference.

## Migration from v2

See [Migration Guide](./docs/migration-v3.md) for upgrading from v2.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

[MIT](./LICENSE)
