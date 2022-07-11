# React Code View

---

`react-code-view` is a React component based on `codemirror` and `marked`. It enables `jsx` code in `markdown` to be rendered to the page.

## Install

```bash
npm install react-code-view
```

## Usage

```jsx
import CodeView from 'react-code-view';
import { Button } from 'rsuite';

import 'react-code-view/styles/react-code-view.css';

return <CodeView dependencies={{ Button }}>{require('./example.md')}</CodeView>;
```

> See [example.md](https://github.com/simonguo/react-code-view/blob/master/docs/example.md)

## Example

<!--start-code-->

```js
// example.md

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';

const App = () => {
  return <Button>Test</Button>;
};

ReactDOM.render(<App />);
```

<!--end-code-->

> Note: You can try changing the code above and see what changes.
