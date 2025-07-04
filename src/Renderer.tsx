/* eslint-disable @typescript-eslint/no-var-requires */
import classNames from 'classnames';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import canUseDOM from './utils/canUseDOM';
import evalCode from './utils/evalCode';
import CodeIcon from './icons/Code';
import { useEffect, useState, useCallback } from 'react';
import { transform as transformCode, Options } from 'sucrase';

const React = require('react');
const ReactDOM = require('react-dom');

interface EditorProps {
  /** The className of the editor */
  className?: string;

  /** Add a prefix to the className of the buttons on the toolbar */
  classPrefix?: string;

  /** The className of the code button displayed on the toolbar */
  buttonClassName?: string;

  /** Customize the code icon on the toolbar */
  icon?: React.ReactNode;

  /** The properties of the show code button */
  showCodeButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export interface RendererProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Code editor theme, applied to CodeMirror */
  theme?: 'light' | 'dark';

  /** The code to be rendered is executed */
  code?: string;

  /** The component used to render the copy button */
  copyButtonAs?: React.ElementType;

  /** The properties of the copy button */
  copyButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    [key: `data-${string}`]: string;
  };

  /** Dependent objects required by the executed code */
  dependencies?: Record<string, unknown>;

  /** Renders a code editor that can modify the source code */
  editable?: boolean;

  /** Editor properties */
  editor?: EditorProps;

  /**
   * https://github.com/alangpierce/sucrase#transforms
   */
  transformOptions?: Options;

  /** Customize the rendering toolbar */
  renderToolbar?: (
    buttons: React.ReactNode,
    showCodeButtonProps: React.HTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode;

  /** Customize the rendering footer */
  renderExtraFooter?: () => React.ReactNode;

  /** Callback triggered when the editor is opened */
  onOpenEditor?: () => void;

  /** Callback triggered when the editor is closed */
  onCloseEditor?: () => void;

  /** Callback triggered after code change */
  onChange?: (code?: string) => void;

  /** Executed before compiling the code */
  beforeCompile?: (code: string) => string;

  /** Executed after compiling the code */
  afterCompile?: (code: string) => string;
}

const defaultTransformOptions: Options = { transforms: ['jsx'] };

const Renderer = React.forwardRef((props: RendererProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    dependencies,
    editor = {},
    theme = 'light',
    editable: isEditable = false,
    transformOptions = defaultTransformOptions,
    code,
    copyButtonAs,
    copyButtonProps,
    renderToolbar,
    renderExtraFooter,
    onOpenEditor,
    onCloseEditor,
    onChange,
    beforeCompile,
    afterCompile,
    ...rest
  } = props;

  const {
    classPrefix,
    icon: codeIcon,
    className: editorClassName,
    buttonClassName,
    showCodeButtonProps,
    ...editorProps
  } = editor;

  const [editable, setEditable] = useState(isEditable);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compiledReactNode, setCompiledReactNode] = useState(null);

  const handleExpandEditor = useCallback(() => {
    setEditable(!editable);

    if (editable) {
      onCloseEditor?.();
    } else if (!editable) {
      onOpenEditor?.();
    }
  }, [editable, onCloseEditor, onOpenEditor]);

  const handleError = useCallback(error => {
    setErrorMessage(error.message);
  }, []);

  const prefix = name => (classPrefix ? `${classPrefix}-${name}` : name);

  const executeCode = useCallback(
    (pendCode = code) => {
      if (!canUseDOM) {
        return;
      }

      const originalRender = ReactDOM.render;

      // Redefine the render function, which will reset to the default value after `eval` is executed.
      ReactDOM.render = element => {
        setCompiledReactNode(element);
      };

      try {
        const beforeCompileCode = beforeCompile?.(pendCode) || pendCode;

        if (beforeCompileCode) {
          const { code: compiledCode } = transformCode(beforeCompileCode, transformOptions);

          evalCode(afterCompile?.(compiledCode) || compiledCode, {
            React,
            ReactDOM,
            ...dependencies
          });
        }
      } catch (err) {
        console.warn(err);
      } finally {
        // Reset the render function to the original value.
        ReactDOM.render = originalRender;
      }
    },
    [code, dependencies, beforeCompile, transformOptions, afterCompile]
  );

  useEffect(() => {
    executeCode(code);
  }, [code, executeCode]);

  const handleCodeChange = useCallback(
    (code?: string) => {
      onChange?.(code);
      executeCode(code);
      setErrorMessage(null);
    },
    [executeCode, onChange]
  );

  const toggleButtonProps = {
    role: 'switch',
    'aria-checked': editable,
    'aria-label': 'Show the full source',
    className: buttonClassName,
    onClick: handleExpandEditor,
    ...showCodeButtonProps
  };

  const showCodeButton = (
    <button {...toggleButtonProps}>
      {typeof codeIcon !== 'undefined' ? (
        codeIcon
      ) : (
        <CodeIcon className={classNames(prefix('icon'), prefix('icon-code'))} />
      )}
    </button>
  );

  const showCodeEditor = editable && code;
  const hasError = !!errorMessage;

  return (
    <div className="rcv-container" {...rest} ref={ref}>
      <Preview hasError={hasError} errorMessage={errorMessage} onError={handleError}>
        {compiledReactNode}
      </Preview>
      <div className="rcv-toolbar">
        {renderToolbar ? renderToolbar(showCodeButton, toggleButtonProps) : showCodeButton}
      </div>
      {showCodeEditor && (
        <CodeEditor
          {...editorProps}
          key="jsx"
          copyButtonAs={copyButtonAs}
          copyButtonProps={copyButtonProps}
          onChange={handleCodeChange}
          className={classNames(editorClassName, 'rcv-editor')}
          editorConfig={{ lineNumbers: true, theme: `base16-${theme}` }}
          code={code}
        />
      )}
      {renderExtraFooter?.()}
    </div>
  );
});

export default Renderer;
