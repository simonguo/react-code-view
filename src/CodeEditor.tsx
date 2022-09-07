import React, { useCallback, useState } from 'react';
import { EditorFromTextArea, EditorConfiguration } from 'codemirror';
import { useRef } from 'react';
import { useEffect } from 'react';

export interface CodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  code?: string;
  editorConfig?: EditorConfiguration;
  onChange?: (code?: string) => void;
  onInitialized?: (editor: EditorFromTextArea) => void;
}

const defaultEditorConfig = {
  mode: 'jsx',
  tabSize: 2,
  theme: 'default'
};

async function importCodeMirror() {
  const CodeMirror = await import('codemirror').then(module =>
    typeof module === 'function' ? module : module.default
  );

  await Promise.all([
    import('codemirror/mode/javascript/javascript'),
    import('codemirror/mode/jsx/jsx'),
    import('codemirror/addon/runmode/runmode')
  ]);

  return CodeMirror;
}

const CodeEditor = React.forwardRef((props: CodeEditorProps, ref: React.Ref<HTMLDivElement>) => {
  const { code, editorConfig, onChange, onInitialized, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<EditorFromTextArea | null>(null);
  const [initialized, setInitialized] = useState(false);

  const handleChange = useCallback(() => {
    onChange?.(editor.current?.getValue());
  }, [onChange]);

  useEffect(() => {
    importCodeMirror().then(CodeMirror => {
      if (!CodeMirror || !textareaRef.current) {
        return;
      }

      setInitialized(true);

      if (!editor.current) {
        editor.current = CodeMirror.fromTextArea(textareaRef.current, {
          ...defaultEditorConfig,
          ...editorConfig
        });
        editor.current.on('change', handleChange);
        onInitialized?.(editor.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (code) {
      editor.current?.setValue(code);
    }
  }, [code]);

  return (
    <div ref={ref} {...rest}>
      {!initialized && <div className="rcv-editor-loader">Editor initializing ...</div>}
      <textarea ref={textareaRef} defaultValue={code?.trim()} />
    </div>
  );
});

export default CodeEditor;
