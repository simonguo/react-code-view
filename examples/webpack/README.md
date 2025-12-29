# React Code View - Webpack Example

This example demonstrates how to use React Code View with Webpack.

## Features

- 📦 Webpack 5 with HMR
- 🎨 Theme switching (light/dark)
- 📝 Live code editing
- 🔄 Multiple interactive examples
- 🎯 TypeScript support

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
npm run build
```

The production build will be in the `dist` folder.

## Configuration

The example uses Webpack 5 with:

- `ts-loader` - TypeScript compilation
- `css-loader` & `style-loader` - CSS handling
- `html-webpack-plugin` - HTML generation
- Hot Module Replacement (HMR)

See [webpack.config.js](./webpack.config.js) for details.

## Examples Included

1. **Timer** - useEffect and intervals
2. **Tabs** - Tab navigation component
3. **Accordion** - Expandable sections

## Learn More

- [React Code View Documentation](https://github.com/simonguo/react-code-view)
- [Webpack Documentation](https://webpack.js.org)
