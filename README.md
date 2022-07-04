# react-code-view

Let the React code in Markdown be rendered to the page, and support online editing.

English | [中文版][readm-cn]

![preview](https://user-images.githubusercontent.com/1203827/44707274-a30c0f80-aad6-11e8-8cc5-9cf7daf4d9e2.gif)

## Principle of implementation

- Parse Markdown documents through `markdown-loader` and `html-loader`.
- Extract the code that needs to be rendered in the document and pass it to the `codemirror` editor.
- Compile the code in `codemirror` through swc, and then render the component to the specified container through `ReactDOM.render`.

## Install

```
npm install react-code-view
```

### Configure Webpack

Support for `markdown` needs to be added in webpack.

```
npm install html-loader --save-dev
npm install markdown-loader --save-dev
```

`webpack.config.js`

```js

const renderer = require('react-code-view/webpack/renderer');

...
{
  test: /\.md$/,
  use: [{
    loader: 'html-loader'
  }, {
    loader: 'markdown-loader',
    options: {
      renderer: renderer(
        // Pass languages to highlight.js. Default value: ['javascript', 'bash', 'xml', 'css', 'markdown', 'less']
        // See https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
      )
    }
  }]
}
```

## Example

```js
import CodeView from 'react-code-view';
import { Button } from 'rsuite';

import 'react-code-view/lib/less/index.less';

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

The source code is written in markdown, refer to [example.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md)

> Note: The code to be rendered must be placed between `<!--start-code-->` and `<!--end-code-->`

## Props

### `<CodeView>`

| Name             | Type                              | Default value           | Description                                                               |
| ---------------- | --------------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| children         | any                               |                         | The code to be rendered is executed. Usually imported via markdown-loader |
| dependencies     | object                            |                         | Dependent objects required by the executed code                           |
| editable         | boolean                           | false                   | Renders a code editor that can modify the source code                     |
| editor           | object                            |                         | Editor properties                                                         |
| renderToolbar    | (buttons: ReactNode) => ReactNode |                         | Customize the rendering toolbar                                           |
| sourceCode       | string                            |                         | The code to be rendered is executed                                       |
| theme            | 'light' , 'dark'                  | 'light'                 | Code editor theme, applied to CodeMirror                                  |
| transformOptions | object                            | defaultTransformOptions | swc configuration https://swc.rs/docs/configuration/compilation           |

[readm-cn]: https://github.com/simonguo/react-code-view/blob/master/README_zh-CN.md
