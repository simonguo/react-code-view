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

```js
// webpack.config.js
export default {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'react-code-view/webpack-md-loader',
            parseLanguages: ['javascript', 'bash', 'xml', 'css', 'markdown', 'less', 'typescript'],
            htmlOptions: {
              // HTML Loader options
              // See https://github.com/webpack-contrib/html-loader#options
            },
            markedOptions: {
              // Pass options to marked
              // See https://marked.js.org/using_advanced#options
            }
          }
        ]
      }
    ]
  }
};
```

## 使用

```js
import CodeView from 'react-code-view';
import { Button } from 'rsuite';

import 'react-code-view/styles/styles.less'; // or 'react-code-view/styles/react-code-view.css'

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
| afterCompile     | (code: string) => string          |                         | 在编译代码之后执行                                              |
| beforeCompile    | (code: string) => string          |                         | 在编译代码之前执行                                              |
| children         | any                               |                         | 渲染的代码。 通常通过 `markdown-loader`` 导入                   |
| compiler         | (code: string) => string          |                         | 转换代码的编译器。 默认使用 swc.transformSync                   |
| dependencies     | object                            |                         | 执行代码所需的依赖对象                                          |
| editable         | boolean                           | false                   | 渲染一个可以修改源代码的代码编辑器                              |
| editor           | object                            |                         | 编辑器属性配置                                                  |
| onChange         | (code?: string) => void           |                         | 代码改变后执行的回调                                            |
| renderToolbar    | (buttons: ReactNode) => ReactNode |                         | 自定义渲染工具栏                                                |
| sourceCode       | string                            |                         | 渲染的代码                                                      |
| theme            | 'light' , 'dark'                  | 'light'                 | 代码编辑器主题，应用于 CodeMirror                               |
| transformOptions | object                            | defaultTransformOptions | swc configuration https://swc.rs/docs/configuration/compilation |

[readm-en]: https://github.com/simonguo/react-code-view/blob/master/README.md
