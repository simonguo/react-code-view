# React Code View - esbuild Example

This example demonstrates how to use React Code View with esbuild.

## Features

- ⚡ **Blazing Fast** - esbuild compiles at lightning speed
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

Open [http://localhost:3003](http://localhost:3003) in your browser.

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

The example uses a custom esbuild configuration in `build.js`:

- **Development Mode**: Watch mode with live reload
- **Production Mode**: Optimized bundle with minification
- **TypeScript**: Native TSX/TS support
- **CSS**: Built-in CSS bundling

See [build.js](./build.js) for the full configuration.

## Why esbuild?

- 🚀 **10-100x faster** than traditional bundlers
- 📦 **Zero configuration** for most use cases
- 🎯 **Native TypeScript** support
- 💪 **Production ready** with tree shaking and minification

## Examples Included

1. **Toast Notifications** - Dynamic toast messages
2. **Progress Bar** - Animated progress indicator
3. **Interactive Sliders** - Range inputs with RGB color mixer

## Performance

esbuild builds this example in **~50ms** compared to seconds with traditional bundlers.

## Learn More

- [React Code View Documentation](https://github.com/simonguo/react-code-view)
- [esbuild Documentation](https://esbuild.github.io)
