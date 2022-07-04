# react-code-view

让 Markdown 中的 React 代码可以渲染到页面，并支持支持在线编辑。

[English][readm-en] | 中文版

![preview](https://user-images.githubusercontent.com/1203827/44707274-a30c0f80-aad6-11e8-8cc5-9cf7daf4d9e2.gif)

## 原理

- 就通过 `markdown-loader` 与 `html-loader` 解析 Markdown 文档。
- 提取出文档中需要渲染的代码，传递给 `codemirror` 编辑器。
- 把 `codemirror` 中的代码通过 swc 编译，再通过 `ReactDOM.render` 把组件渲染到指定的容器中。

## 安装

```
npm install react-code-view
```

### 配置 Webpack

在 webpack 中需要添加对 `markdown` 的支持。

```
npm install html-loader --save-dev
npm install markdown-loader --save-dev
```

`webpack.config.js` 配置

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

## 示例

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

源代码都统一写在 markdown 中，参考 [example.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md)。

> 注意: 把需要渲染的代码一定要放在 `<!--start-code-->` 与 `<!--end-code-->` 之间。

## Props

### `<CodeView>`

| Name             | Type                              | Default value           | Description                                                     |
| ---------------- | --------------------------------- | ----------------------- | --------------------------------------------------------------- |
| children         | any                               |                         | 渲染的代码。 通常通过 `markdown-loader`` 导入                   |
| dependencies     | object                            |                         | 执行代码所需的依赖对象                                          |
| editable         | boolean                           | false                   | 渲染一个可以修改源代码的代码编辑器                              |
| editor           | object                            |                         | 编辑器属性配置                                                  |
| renderToolbar    | (buttons: ReactNode) => ReactNode |                         | 自定义渲染工具栏                                                |
| sourceCode       | string                            |                         | 渲染的代码                                                      |
| theme            | 'light' , 'dark'                  | 'light'                 | 代码编辑器主题，应用于 CodeMirror                               |
| transformOptions | object                            | defaultTransformOptions | swc configuration https://swc.rs/docs/configuration/compilation |

[readm-en]: https://github.com/simonguo/react-code-view/blob/master/README.md
