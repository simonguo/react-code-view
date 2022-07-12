# [2.1.0](https://github.com/simonguo/react-code-view/compare/2.0.0...2.1.0) (2022-07-12)


### Features

* support for rendering multiple examples in markdown ([#35](https://github.com/simonguo/react-code-view/issues/35)) ([d021789](https://github.com/simonguo/react-code-view/commit/d021789b8ebcd540c54f34131c1aa1a1be79a442))



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
