import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid } from 'rsuite';
import CodeView from '../src';

import './styles/index.less';

const example = require('./example.md');

const App = () => {
  return (
    <Grid>
      <CodeView
        editable
        theme="dark"
        dependencies={{ Button }}
        afterCompile={(code: string) => {
          return code.replace(/import\ [\w\,\{\}\ ]+\ from\ "[\w-]+";/gi, '');
        }}
      >
        {example}
      </CodeView>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
