# react-code-view


## 安装

```
npm install react-code-view
// or
yarn add react-code-view
```


### 配置 webpack

在 webpack 中需要添加对 `markdown-loader` 的支持。 需要安装：

```
npm install html-loader --save-dev
npm install markdown-loader --save-dev
npm install react-markdown-reader --save-dev
```


`webpack.config.js` 配置

**webpack 2.x +**

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
      renderer: markdownRenderer
    }
  }]
}
```

### 添加 Babel

在 html 中引入 :
```html
<script type="text/javascript" src="//cdn.staticfile.org/babel-standalone/6.24.0/babel.min.js"></script>
```

## 示例

```js

import CodeView from 'react-code-view';
import '~react-code-view/lib/less/index.less';

import { Button } from 'rsuite';

<CodeView
  source={require('./test.md')}
  dependencies={{
    Button
  }}
/>
```

- [test.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/test.md)


> 把需要运行的代码放到 ```js 里面。



## API


| Prop name    | Type   | Description |
|--------------|--------|-------------|
| source       | string | code        |
| dependencies | object | 依赖的组件       |
| showCode     | bool   | 是否默认显示代码    |
