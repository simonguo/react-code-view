# React Code View

## 背景

让 Markdown 中的代码可以实时运行，为什么会有这样一个需求？

很多前端团队技术相关的文档都采用 Markdown 编写， 文档中往往会伴随很多示例代码，我们希望大家在阅读文档的时候，可以运行示例代码，看到效果。

## 特性

- Markdown 中的代码可以运行，并预览效果
- 代码可以在线编辑
- 不影响整个文档流的布局
- 支持 React, 支持代码高亮

<!--start-code-->
```js
const instance = (
  <Button>
    Test
  </Button>
);
ReactDOM.render(instance);
```
<!--end-code-->

> 可以试着手动修改代码

Markdown 源文件: [example.md](https://raw.githubusercontent.com/simonguo/react-code-view/master/docs/example.md)
Github: [react-code-view](https://github.com/simonguo/react-code-view)
