# @react-code-view/unplugin

Universal build tool plugin for processing markdown files with syntax highlighting. Supports Webpack, Vite, Rollup, esbuild, and Rspack.

## Installation

```bash
pnpm add @react-code-view/unplugin
# or
npm install @react-code-view/unplugin
```

## Usage

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCodeView from '@react-code-view/unplugin/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView({
      // options
    })
  ]
});
```

### Webpack

```js
// webpack.config.js
const ReactCodeViewPlugin = require('@react-code-view/unplugin/webpack');

module.exports = {
  plugins: [
    ReactCodeViewPlugin({
      // options
    })
  ]
};
```

### Rollup

```js
// rollup.config.js
import reactCodeView from '@react-code-view/unplugin/rollup';

export default {
  plugins: [
    reactCodeView({
      // options
    })
  ]
};
```

### esbuild

```js
import * as esbuild from 'esbuild';
import reactCodeView from '@react-code-view/unplugin/esbuild';

await esbuild.build({
  plugins: [
    reactCodeView({
      // options
    })
  ]
});
```

### Rspack

```js
// rspack.config.js
const ReactCodeViewPlugin = require('@react-code-view/unplugin/rspack');

module.exports = {
  plugins: [
    ReactCodeViewPlugin({
      // options
    })
  ]
};
```

## Options

```ts
interface PluginOptions {
  /**
   * File extensions to process
   * @default ['.md', '.mdx']
   */
  include?: string[];

  /**
   * File patterns to exclude
   * @default [/node_modules/]
   */
  exclude?: (string | RegExp)[];

  /**
   * Generate React component wrapper
   * @default true
   */
  wrapComponent?: boolean;

  /**
   * Component name for generated exports
   * @default 'MarkdownContent'
   */
  componentName?: string;

  /**
   * Transform options for markdown processing
   */
  transformOptions?: {
    gfm?: boolean;
    breaks?: boolean;
    // ... more marked options
  };

  /**
   * Renderer options for code highlighting
   */
  rendererOptions?: {
    languages?: string[];
    // ... highlight.js options
  };
}
```

## Importing Markdown Files

After setting up the plugin, you can import `.md` files directly:

```tsx
import Content, { codeBlocks } from './docs/example.md';

function App() {
  return (
    <div>
      <Content />
      {codeBlocks.map((block, i) => (
        <pre key={i}>{block.code}</pre>
      ))}
    </div>
  );
}
```

## Generated Exports

Each markdown file exports:

- `default` / `MarkdownContent` - React component rendering the markdown
- `content` - Raw HTML string
- `codeBlocks` - Array of `{ code, language }` objects for all code blocks

## License

MIT
