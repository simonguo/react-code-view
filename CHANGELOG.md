## [2.6.1](https://github.com/simonguo/react-code-view/compare/2.6.0...2.6.1) (2025-07-04)


### Bug Fixes

* **types:** add support for data-* attributes in button props ([#58](https://github.com/simonguo/react-code-view/issues/58)) ([92bb75c](https://github.com/simonguo/react-code-view/commit/92bb75c2797b67d3ede20bb6b7fde0c30b8bc7a4))



# [2.6.0](https://github.com/simonguo/react-code-view/compare/2.5.0...2.6.0) (2025-07-04)


### Features

* improve copy button functionality and styling ([#57](https://github.com/simonguo/react-code-view/issues/57)) ([255d109](https://github.com/simonguo/react-code-view/commit/255d10906ba2198087f67c8a9789841a95eb4c79))



# [2.4.0](https://github.com/simonguo/react-code-view/compare/2.3.1...2.4.0) (2024-04-17)

### Features

- add support for `renderExtraFooter` and `onOpenEditor` and `onCloseEditor` ([#55](https://github.com/simonguo/react-code-view/issues/55)) ([886d862](https://github.com/simonguo/react-code-view/commit/886d8624b6efca9a6753293e73d3891e1cea3018))

## [2.3.1](https://github.com/simonguo/react-code-view/compare/2.3.0...2.3.1) (2024-01-26)

### Bug Fixes

- fix HTML parsing error ([#54](https://github.com/simonguo/react-code-view/issues/54)) ([5c1aa7f](https://github.com/simonguo/react-code-view/commit/5c1aa7f3a0c6401284490fa653edb6263049a7e1))

# [2.3.0](https://github.com/simonguo/react-code-view/compare/2.2.1...2.3.0) (2024-01-26)

### Features

- add support for one-click copy code ([#53](https://github.com/simonguo/react-code-view/issues/53)) ([f379146](https://github.com/simonguo/react-code-view/commit/f3791464b6c55c325c50d89ed50953c15c2e08e6))

## [2.2.1](https://github.com/simonguo/react-code-view/compare/2.2.0...2.2.1) (2022-09-07)

### Bug Fixes

- **CodeEditor:** fix Codemirror being initialized twice ([#40](https://github.com/simonguo/react-code-view/issues/40)) ([bb4aa2c](https://github.com/simonguo/react-code-view/commit/bb4aa2cc3088b1ac64ca94a58ad04aa69f0e8dea))

# [2.2.0](https://github.com/simonguo/react-code-view/compare/2.1.0...2.2.0) (2022-08-01)

### Bug Fixes

- **Renderer:** fix timely re-renders ([#39](https://github.com/simonguo/react-code-view/issues/39)) ([cf77850](https://github.com/simonguo/react-code-view/commit/cf77850e046baf131a54f0d5ace062990671ef39))

### Performance Improvements

- **transform:** use sucrase instead of @swc/wasm-web to improve transcoding performance [#38](https://github.com/simonguo/react-code-view/issues/38)

# [2.1.0](https://github.com/simonguo/react-code-view/compare/2.0.0...2.1.0) (2022-07-12)

### Features

- support for rendering multiple examples in markdown ([#35](https://github.com/simonguo/react-code-view/issues/35)) ([d021789](https://github.com/simonguo/react-code-view/commit/d021789b8ebcd540c54f34131c1aa1a1be79a442))

# 2.0.0

## Features

### Use @swc/wasm-web instead of babel to compile code in the browser.

Importing `babel.min.js` on the page will no longer be required. [How it is used in v1](https://github.com/simonguo/react-code-view/blob/1.2.6/README.md#add-babel)

### Refactored webpack loader for markdown.

```js

// v1

export default {
  module: {
     rules: [
      {
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        }, {
          loader: 'markdown-loader',
          options: {
            renderer: markdownRenderer()
          }
        }]
      }
    ]

  }
};

// v2
export default {
  module: {
    rules: [
      {
        test: /\.md$/,
        use:[
          loader: 'react-code-view/webpack-md-loader',
          options:{
            parseLanguages: ['typescript','rust']
          }
        ]
      }
    ]
  }
};
```

### Props redefined

**v1**

| Name                  | Type     | Default value                               | Description                                       |
| --------------------- | -------- | ------------------------------------------- | ------------------------------------------------- |
| babelTransformOptions | Object   | { presets: ['stage-0', 'react', 'es2015'] } | Babel configuration parameters [options][babeljs] |
| dependencies          | Object   |                                             | Dependent components.                             |
| renderToolbar         | Function |                                             | Custom toolbar.                                   |
| showCode              | boolean  | true                                        | Display code.                                     |
| theme                 | string   | 'light'                                     | Theme, options `light` and `dark`.                |

**v2**

| Name           | Type                              | Default value           | Description                                                               |
| -------------- | --------------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| afterCompile   | (code: string) => string          |                         | Executed after compiling the code                                         |
| beforeCompile  | (code: string) => string          |                         | Executed before compiling the code                                        |
| children       | any                               |                         | The code to be rendered is executed. Usually imported via markdown-loader |
| compiler       | (code: string) => string          |                         | A compiler that transforms the code. Use swc.transformSync by default     |
| dependencies   | object                            |                         | Dependent objects required by the executed code                           |
| editable       | boolean                           | false                   | Renders a code editor that can modify the source code                     |
| editor         | object                            |                         | Editor properties                                                         |
| onChange       | (code?: string) => void           |                         | Callback triggered after code change                                      |
| renderToolbar  | (buttons: ReactNode) => ReactNode |                         | Customize the rendering toolbar                                           |
| sourceCode     | string                            |                         | The code to be rendered is executed                                       |
| theme          | 'light' , 'dark'                  | 'light'                 | Code editor theme, applied to CodeMirror                                  |
| compileOptions | object                            | defaultTransformOptions | swc configuration https://swc.rs/docs/configuration/compilation           |
