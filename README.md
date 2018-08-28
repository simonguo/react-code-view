# react-code-view


## 背景

让 Markdown 中的代码可以实时运行，为什么会有这样一个需求？

在我们前端团队中，技术相关的文档都采用 Markdown 编写， 文档中往往会伴随很多示例代码，我们希望大家在阅读文档的时候，可以运行示例代码，看到效果。


## 需求

- 让 Markdown 中的代码可以运行，并预览效果。
- 代码可以在线编辑。
- 不影响整个文档流的布局。
- 支持 React, 支持代码高亮。
- 可以配置 babel。


明确需求以后，写了一个 React 组件来满足这些功能， [`react-code-view`](https://github.com/simonguo/react-code-view) ， 首先看一下效果：

![preview](https://user-images.githubusercontent.com/1203827/44707274-a30c0f80-aad6-11e8-8cc5-9cf7daf4d9e2.gif)

在线预览: https://simonguo.github.io/react-code-view/


## 原理

- 就通过 `markdown-loader` 与 `html-loader` 解析 Markdown 文档。
- 通过正则表达式取出 code ，交给  `codemirror`
- 把 `codemirror` 中的代码通过 babel 编译，再通过 ReactDOM.render 渲染到指定的容器中。

## 安装

```
npm install react-code-view
```


### 配置 webpack

在 webpack 中需要添加对 `markdown-loader` 的支持。 需要安装：

```
npm install html-loader --save-dev
npm install markdown-loader --save-dev
npm install react-markdown-reader --save-dev
```

`webpack.config.js` 配置

** >=webpack 2.x +**

```js

const markdownRenderer = require('react-markdown-reader').renderer;

{
  test: /\.md$/,
  use: [{
    loader: 'html-loader'
  }, {
    loader: 'markdown-loader',
    options: {
      pedantic: true,
      renderer: markdownRenderer(/**languages:Array<string>**/)
    }
  }]
}
```

languages 默认值：`["javascript", "bash", "xml", "css", "markdown", "less"]`;

Github: https://github.com/simonguo/react-markdown-reader

### 添加 Babel

示例代码中通常是使用到 ES2015+ , React 等，需要对代码实时做编译，所以在 html 中引入 babel :
```html
<script type="text/javascript" src="//cdn.staticfile.org/babel-standalone/6.24.0/babel.min.js"></script>
```

## 示例

```js

import CodeView from 'react-code-view';
import '~react-code-view/lib/less/index.less';

import { Button } from 'rsuite';


<CodeView dependencies={{ Button }} >
  {require('./example.md')}
</CodeView>

```

源代码都统一写在 markdown 中，参考:
[example.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md)

> 这里需要注意的是把需要运行的代码一定要放在 `<!--start-code-->` 与  `<!--end-code-->` 之间。


## API

| Name                  | Type    | Default value                               | Description                       |
| --------------------- | ------- | ------------------------------------------- | --------------------------------- |
| dependencies          | Object  |                                             | 依赖的组件                        |
| showCode              | boolean | true                                        | 显示代码                          |
| babelTransformOptions | Object  | { presets: ['stage-0', 'react', 'es2015'] } | babel 配置参数 [options][babeljs] |


[babeljs]: https://babeljs.io/docs/usage/api/#options