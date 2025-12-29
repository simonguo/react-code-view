# React Code View - Rollup Example

This example demonstrates how to use React Code View with Rollup.

## Features

- 🎯 Rollup bundler with optimized builds
- 🎨 Theme switching (light/dark)
- 📝 Live code editing
- 🔄 Multiple interactive examples
- 💨 TypeScript support
- 🔥 Live reload in development

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

### Build

```bash
npm run build
```

The production build will be in the `dist` folder.

### Serve Production Build

```bash
npm run serve
```

## Configuration

The example uses Rollup with:

- `@rollup/plugin-typescript` - TypeScript compilation
- `rollup-plugin-postcss` - CSS processing
- `@rollup/plugin-node-resolve` - Node module resolution
- `@rollup/plugin-commonjs` - CommonJS to ES6 conversion
- `rollup-plugin-serve` - Development server
- `rollup-plugin-livereload` - Live reload

See [rollup.config.js](./rollup.config.js) for details.

## Examples Included

1. **Modal** - Modal dialog with overlay
2. **Dropdown** - Custom dropdown menu
3. **Tooltip** - Hover tooltip component

## Learn More

- [React Code View Documentation](https://github.com/simonguo/react-code-view)
- [Rollup Documentation](https://rollupjs.org)
