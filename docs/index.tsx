import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid } from 'rsuite';
import CodeView from '../src';

import './less/index.less';

const App = () => {
  return (
    <Grid>
      <CodeView editable theme="dark" dependencies={{ Button }}>
        {require('./example.md')}
      </CodeView>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
