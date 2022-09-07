import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Grid } from 'rsuite';
import CodeView from '../src';

import './styles/index.less';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const example = require('./example.md');

const App = () => {
  return (
    <Grid>
      <CodeView
        editable
        theme="dark"
        dependencies={{ Button }}
        afterCompile={(code: string) => {
          return code.replace(/import\ [\*\w\,\{\}\ ]+\ from\ ?[\."'@/\w-]+;/gi, '');
        }}
      >
        {example}
      </CodeView>
    </Grid>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
