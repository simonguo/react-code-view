# react-code-view


## 安装

```
npm install react-code-view
// or
yarn add react-code-view
```


## 示例

```js
<CodeView
  source={require('./test.md')}
  dependencies={{
    Button
  }}
/>
```



## API


| Prop name    | Type   | Description |
|--------------|--------|-------------|
| source       | string | code        |
| dependencies | object | 依赖的组件       |
| showCode     | bool   | 是否默认显示代码    |
