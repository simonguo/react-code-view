/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState, useCallback, useRef } from 'react';
import CodeIcon from '@rsuite/icons/Code';
import classNames from 'classnames';
import MarkdownRenderer from './MarkdownRenderer';
import CodeEditor from './CodeEditor';
import parseHTML from './utils/parseHTML';
import Preview from './Preview';
import canUseDOM from './utils/canUseDOM';

const React = require('react');
const ReactDOM = require('react-dom');

export interface CodeViewProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Code editor theme, applied to CodeMirror */
  theme?: 'light' | 'dark';

  /** The code to be rendered is executed. Usually imported via markdown-loader. */
  children?: any;

  /** The code to be rendered is executed */
  sourceCode?: string;

  /** Dependent objects required by the executed code */
  dependencies?: object;

  /** Renders a code editor that can modify the source code */
  editable?: boolean;

  /** Editor properties */
  editor?: {
    className?: string;

    /** Add a prefix to the className of the buttons on the toolbar */
    classPrefix?: string;

    /** The className of the code button displayed on the toolbar */
    buttonClassName?: string;

    /** Customize the code icon on the toolbar */
    icon?: React.ReactNode;
  };

  /**
   * swc configuration
   * https://swc.rs/docs/configuration/compilation
   */
  transformOptions?: object;

  /** Customize the rendering toolbar */
  renderToolbar?: (buttons: React.ReactNode) => React.ReactNode;

  /** Callback triggered after code change */
  onChange?: (code?: string) => void;

  /**
   * A compiler that transforms the code. Use swc.transformSync by default
   * See https://swc.rs/docs/usage/wasm
   */
  compiler?: (code: string) => string;

  /** Executed before compiling the code */
  beforeCompile?: (code: string) => string;

  /** Executed after compiling the code */
  afterCompile?: (code: string) => string;
}

const defaultTransformOptions = {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true
    }
  }
};

const CodeView = React.forwardRef((props: CodeViewProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    dependencies,
    editor = {},
    theme = 'light',
    editable: isEditable = false,
    transformOptions = defaultTransformOptions,
    sourceCode,
    renderToolbar,
    onChange,
    beforeCompile,
    compiler,
    afterCompile,
    ...rest
  } = props;

  const {
    classPrefix,
    icon: codeIcon,
    className: editorClassName,
    buttonClassName,
    ...editorProps
  } = editor;

  const [initialized, setInitialized] = useState(false);
  const transfrom = useRef<any>(null);

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    import('@swc/wasm-web').then(async module => {
      await module.default();
      transfrom.current = module.transformSync;
      setInitialized(true);
    });
  }, []);

  const sourceStr: string = children?.__esModule ? children.default : sourceCode;
  const { code, beforeHTML, afterHTML } = parseHTML(sourceStr) || {};
  const [editable, setEditable] = useState(isEditable);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compiledReactNode, setCompiledReactNode] = useState(null);

  const handleExpandEditor = useCallback(() => {
    setEditable(!editable);
  }, [editable]);

  const handleError = useCallback(error => {
    setHasError(true);
    setErrorMessage(error.message);
  }, []);

  const prefix = name => (classPrefix ? `${classPrefix}-${name}` : name);

  const executeCode = useCallback(
    (pendCode: string = code) => {
      if (!canUseDOM) {
        return;
      }

      const originalRender = ReactDOM.render;

      // Redefine the render function, which will reset to the default value after `eval` is executed.
      ReactDOM.render = element => {
        setCompiledReactNode(element);
      };

      try {
        const statement = dependencies
          ? Object.keys(dependencies).map(key => `var ${key}= dependencies.${key};`)
          : [];

        const beforeCompileCode = beforeCompile?.(pendCode) || pendCode;

        if (beforeCompileCode) {
          const { code: compiledCode } = compiler
            ? compiler(beforeCompileCode)
            : transfrom.current?.(beforeCompileCode, transformOptions);

          eval(`${statement.join('\n')} ${afterCompile?.(compiledCode) || compiledCode}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        // Reset the render function to the original value.
        ReactDOM.render = originalRender;
      }
    },
    [code, dependencies, beforeCompile, compiler, transformOptions, afterCompile]
  );

  useEffect(() => {
    if (initialized) {
      executeCode(code);
    }
  }, [initialized, code, executeCode]);

  const handleCodeChange = useCallback(
    (code?: string) => {
      setHasError(false);
      setErrorMessage(null);
      onChange?.(code);

      if (initialized) {
        executeCode(code);
      }
    },
    [executeCode, initialized, onChange]
  );

  const codeButton = (
    <button
      role="switch"
      aria-checked={editable}
      aria-label="Show the full source"
      className={classNames(prefix('btn'), prefix('btn-xs'), buttonClassName)}
      onClick={handleExpandEditor}
    >
      {typeof codeIcon !== 'undefined' ? (
        codeIcon
      ) : (
        <CodeIcon className={classNames(prefix('icon'), prefix('icon-code'))} />
      )}
    </button>
  );

  const showCodeEditor = editable && code && initialized;

  return (
    <div ref={ref} {...rest}>
      <MarkdownRenderer>{beforeHTML}</MarkdownRenderer>
      <div className="rcv-container">
        <Preview hasError={hasError} errorMessage={errorMessage} onError={handleError}>
          {compiledReactNode}
        </Preview>
        <div className="rcv-toolbar">{renderToolbar ? renderToolbar(codeButton) : codeButton}</div>
        {showCodeEditor && (
          <CodeEditor
            {...editorProps}
            key="jsx"
            onChange={handleCodeChange}
            className={classNames(editorClassName, 'rcv-editor')}
            editorConfig={{ lineNumbers: true, theme: `base16-${theme}` }}
            code={code}
          />
        )}
      </div>
      <MarkdownRenderer>{afterHTML}</MarkdownRenderer>
    </div>
  );
});

export default CodeView;
