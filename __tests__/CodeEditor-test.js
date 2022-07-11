import React from 'react';
import { render, act } from '@testing-library/react';
import CodeEditor from '../src/CodeEditor';

it('renders without crashing', async () => {
  await act(async () => {
    render(<CodeEditor />);
  });
});

it('editor should be initialized', async () => {
  await act(async () => {
    const { container } = render(
      <CodeEditor
        onInitialized={() => {
          expect(container.querySelector('.rcv-editor-loader')).toBeFalsy();
        }}
      />
    );
    expect(container.querySelector('.rcv-editor-loader')).toBeTruthy();
  });
});

it('should be initialized code', async () => {
  await act(async () => {
    const { container } = render(
      <CodeEditor
        code={'const a = 1;'}
        onInitialized={() => {
          expect(container.querySelector('textarea').value).toBe('const a = 1;');
          expect(container.querySelector('.CodeMirror').textContent).toBe('const a = 1;');
        }}
      />
    );
    expect(container.querySelector('.rcv-editor-loader')).toBeTruthy();
  });
});

it('should call onChange callback', async () => {
  await act(async () => {
    const { container } = render(
      <CodeEditor
        code={'const a = 1;'}
        onChange={value => {
          expect(container.querySelector('textarea').value).toBe('const a = 1;');
          expect(value).toBe('const a = 2;');
        }}
        onInitialized={editor => {
          editor.setValue('const a = 2;');
        }}
      />
    );
  });
});
