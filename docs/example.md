# React Code View

---

**React Code View** can render source code in markdown documents. And brings you the ability to render React components with editable source code and live preview.

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

> See [example.md](https://github.com/simonguo/react-code-view/blob/main/docs/example.md)

## Example

### First example

<!--start-code-->

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';

const App = () => {
  const [count, setCount] = React.useState(1);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>
        <span>★</span> Star {count}
      </Button>
    </>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->

### Second example

<!--start-code-->

```js
ReactDOM.render(<Button>Second example</Button>);
```

<!--end-code-->

> Note: You can try changing the code above and see what changes.
