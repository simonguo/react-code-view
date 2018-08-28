# react-code-view

`react-code-view` 是一个代码展示的 react 组件。
把用 markdown 写的文档， 能够方便的转换成可以执行的代码，同时不影响整个文档的阅读。 还可以在线编辑示例代码。

![preview](https://user-images.githubusercontent.com/1203827/44707274-a30c0f80-aad6-11e8-8cc5-9cf7daf4d9e2.gif)

在线预览: https://simonguo.github.io/react-code-view/



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


<CodeView dependencies={{ Button}} >
  {require('./test.md')}
</CodeView>

```

源代码都统一写在 markdown 中，参考:
[test.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/test.md)

> 这里需要注意的是把需要运行的代码一定要放在 `<!--start-code-->` 与  `<!--end-code-->` 之间。

Github: https://github.com/simonguo/react-code-view

## API

| Name                  | Type    | Default value                           | Description                       |
| --------------------- | ------- | --------------------------------------- | --------------------------------- |
| dependencies          | Object  |                                         | 依赖的组件                        |
| showCode              | boolean | true                                    | 显示代码                          |
| babelTransformOptions | Object  | presets: ['stage-0', 'react', 'es2015'] | babel 配置参数 [options][babeljs] |


[babeljs]: https://babeljs.io/docs/usage/api/#options