import React, { useEffect, useRef } from 'react';
import { EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor, rectangularSelection, crosshairCursor, lineNumbers as showLineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

export interface CodeEditorProps {
  /** Code to edit */
  code: string;

  /** Callback when code changes */
  onChange?: (code: string) => void;

  /** Whether the editor is read-only */
  readOnly?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Custom className */
  className?: string;

  /** Code language for syntax highlighting */
  language?: string;

  /** Show line numbers */
  lineNumbers?: boolean;

  /** Editor theme: 'light' | 'dark' */
  theme?: 'light' | 'dark';

  /** CodeMirror instance options (reserved for future use) */
  editorOptions?: Record<string, unknown>;
}

/**
 * Modern code editor component powered by CodeMirror 6
 */
export const CodeEditor = React.memo<CodeEditorProps>(
  ({
    code,
    onChange,
    readOnly = false,
    placeholder,
    className = '',
    language = 'javascript',
    theme = 'light'
  }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
      if (!editorRef.current) return;

      // Get language extension based on language prop
      const getLanguageExtension = (lang: string) => {
        const normalized = lang.toLowerCase();
        switch (normalized) {
          case 'javascript':
          case 'js':
          case 'jsx':
            return javascript({ jsx: true });
          case 'typescript':
          case 'ts':
          case 'tsx':
            return javascript({ typescript: true, jsx: true });
          case 'css':
          case 'less':
          case 'scss':
            return css();
          case 'html':
          case 'xml':
            return html();
          case 'json':
            return json();
          case 'markdown':
          case 'md':
            return markdown();
          default:
            return javascript();
        }
      };

      // Build basic extensions
      const basicExtensions = [
        showLineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap
        ])
      ];

      // Build extensions array
      const extensions = [
        ...basicExtensions,
        getLanguageExtension(language),
        EditorView.lineWrapping,
        EditorState.readOnly.of(readOnly),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString());
          }
        })
      ];

      // Add theme
      if (theme === 'dark') {
        extensions.push(oneDark);
      }

      // Add placeholder if provided
      if (placeholder) {
        extensions.push(
          EditorView.theme({
            '.cm-content': {
              minHeight: '100px'
            }
          })
        );
      }

      // Create editor state
      const state = EditorState.create({
        doc: code,
        extensions
      });

      // Create editor view
      const view = new EditorView({
        state,
        parent: editorRef.current
      });

      viewRef.current = view;

      // Cleanup
      return () => {
        view.destroy();
        viewRef.current = null;
      };
    }, [language, readOnly, theme, placeholder]); // Note: onChange is intentionally omitted

    // Update document when code prop changes externally
    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;

      const currentCode = view.state.doc.toString();
      if (currentCode !== code) {
        view.dispatch({
          changes: {
            from: 0,
            to: currentCode.length,
            insert: code
          }
        });
      }
    }, [code]);

    return <div className={`rcv-code-editor ${className}`} ref={editorRef} />;
  }
);

CodeEditor.displayName = 'CodeEditor';
