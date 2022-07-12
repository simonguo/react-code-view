# react-code-view

`react-code-view` is a React component based on `codemirror` and `marked`. It enables `jsx` code in `markdown` to be rendered to the page.

![preview](https://user-images.githubusercontent.com/1203827/44707274-a30c0f80-aad6-11e8-8cc5-9cf7daf4d9e2.gif)

## Install

```
npm install react-code-view
```

### Configure Webpack

```js
// webpack.config.js
export default {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'react-code-view/webpack-md-loader'
      }
    ]
  }
};
```

#### Options

```js
{
  "parseLanguages": [
    // Supported languages for highlight.js
    // default: "javascript", "bash", "xml", "css", "markdown", "less", "typescript"
    // See https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
  ],
  "htmlOptions": {
    // HTML Loader options
    // See https://github.com/webpack-contrib/html-loader#options
  },
  "markedOptions": {
    // Pass options to marked
    // See https://marked.js.org/using_advanced#options
  }
}
```

**webpack.config.js**

```js

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

## Usage

```js
import CodeView from 'react-code-view';
import { Button } from 'rsuite';

import 'react-code-view/styles/react-code-view.css';

return (
  <CodeView
    dependencies={{
      Button
    }}
  >
    {require('./example.md')}
  </CodeView>
);
```

The source code is written in markdown, refer to [example.md](https://raw.githubusercontent.com/simonguo/react-code-view/main/docs/example.md)

> Note: The code to be rendered must be placed between `<!--start-code-->` and `<!--end-code-->`

## Props

### `<CodeView>`

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
