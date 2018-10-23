# React Code View

## 背景

让 Markdown 中的代码可以实时运行，为什么会有这样一个需求？

很多前端团队技术相关的文档都采用 Markdown 编写， 文档中往往会伴随很多示例代码，我们希望大家在阅读文档的时候，可以运行示例代码，看到效果。

## 特性

- Markdown 中的代码可以运行，并预览效果
- 代码可以在线编辑
- 不影响整个文档流的布局
- 支持 React, 支持代码高亮

## 演示

<!--start-code-->

```js
const instance = <Button>Test</Button>;
ReactDOM.render(instance);
```

<!--end-code-->

> 可以试着手动修改代码


## 示例代码

```js
import CodeView from 'react-code-view';
import 'react-code-view/lib/less/index.less';

import { Button } from 'rsuite';


<CodeView dependencies={{ Button }} >
  {require('./example.md')}
</CodeView>
```

## API


### `theme` `string`

设置主题，可选项： 'light', 'dark'

默认值：'light'

### `dependencies` `Object`

依赖的资源

### `showCode` `boolean`

显示代码

默认值: true

### `babelTransformOptions` `Object`

babel 配置参数 [options][babeljs]

默认值: { presets: ['stage-0', 'react', 'es2015'] }

[babeljs]: https://babeljs.io/docs/usage/api/#options

## 源码

- Github: [react-code-view](https://github.com/simonguo/react-code-view)
- Markdown 源文件: [example.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md)
