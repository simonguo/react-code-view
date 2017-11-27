import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';
import { Markdown } from 'react-markdown-reader';
import CodeView from '../src';

import './less/index.less';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <CodeView
          source={require('./test.md')}
          showCode
          dependencies={{
            Button
          }}
        />
        <p>可以试着手动修改代码</p>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
