import React, { useCallback } from 'react';
import CodeMirror, { EditorFromTextArea, EditorConfiguration } from 'codemirror';
import { useRef } from 'react';
import { useEffect } from 'react';

export interface CodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  code?: string;
  editorConfig?: EditorConfiguration;
  onChange?: (code?: string) => void;
}

const defaultEditorConfig = {
  mode: 'jsx',
  tabSize: 2,
  theme: 'default'
};


const CodeEditor = React.forwardRef((props: CodeEditorProps, ref: React.Ref<HTMLDivElement>) => {
  const { code, onChange, editorConfig, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<EditorFromTextArea | null>(null);

  const handleChange = useCallback(() => {
    onChange?.(editor.current?.getValue());
  }, [onChange]);

  useEffect(() => {
    if (textareaRef.current) {
      editor.current = CodeMirror.fromTextArea(
        textareaRef.current,
        Object.assign(defaultEditorConfig, editorConfig)
      );

      editor.current.on('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (code) {
      editor.current?.setValue(code);
    }
  }, [code]);

  return (
    <div ref={ref} {...rest}>
      <textarea ref={textareaRef} defaultValue={code?.trim()} />
    </div>
  );
});

export default CodeEditor;
