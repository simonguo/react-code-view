import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rsuite';
import CodeView from '../src';

import './less/index.less';
import '../src/less/index.less';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <CodeView
          babelTransformOptions={{
            presets: ['stage-0', 'react', 'es2015']
          }}
          showCode
          dependencies={{
            Button
          }}
        >
          {require('./example.md')}
        </CodeView>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
