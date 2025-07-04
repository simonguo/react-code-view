import React from 'react';
import ReactDOM from 'react-dom';
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
        editor={{
          buttonClassName: 'rs-btn rs-btn-sm rs-btn-icon'
        }}
        afterCompile={(code: string) => {
          return code.replace(/import\ [\*\w\,\{\}\ ]+\ from\ ?[\."'@/\w-]+;/gi, '');
        }}
        onOpenEditor={() => {
          console.log('open editor');
        }}
        onCloseEditor={() => {
          console.log('close editor');
        }}
        renderExtraFooter={() => {
          return <div>Footer</div>;
        }}
        copyButtonProps={{
          className: 'rs-btn-icon rs-btn-icon-circle rs-btn rs-btn-subtle rs-btn-xs'
        }}
      >
        {example}
      </CodeView>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
