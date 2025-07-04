import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import parseHTML from './utils/parseHTML';
import Renderer, { RendererProps } from './Renderer';

export interface CodeViewProps extends RendererProps {
  /** The code to be rendered is executed. Usually imported via markdown-loader. */
  children?: any;

  /** The code to be rendered is executed */
  sourceCode?: string;

  /** The properties of the copy button */
  copyButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    [key: `data-${string}`]: string;
  };
}

const CodeView = React.forwardRef((props: CodeViewProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    sourceCode,
    dependencies,
    editor = {},
    theme = 'light',
    editable,
    transformOptions,
    copyButtonAs,
    copyButtonProps,
    renderToolbar,
    onChange,
    beforeCompile,
    afterCompile,
    onOpenEditor,
    onCloseEditor,
    renderExtraFooter,
    ...rest
  } = props;

  const sourceStr: string = children?.__esModule ? children.default : sourceCode;
  const fragments = parseHTML(sourceStr);

  return (
    <div ref={ref} {...rest}>
      {fragments?.map(fragment => {
        if (fragment.type === 'code') {
          return (
            <Renderer
              key={fragment.key}
              code={fragment.content}
              editable={editable}
              theme={theme}
              editor={editor}
              dependencies={dependencies}
              transformOptions={transformOptions}
              renderToolbar={renderToolbar}
              afterCompile={afterCompile}
              onChange={onChange}
              onOpenEditor={onOpenEditor}
              onCloseEditor={onCloseEditor}
              beforeCompile={beforeCompile}
              renderExtraFooter={renderExtraFooter}
              copyButtonProps={copyButtonProps}
              copyButtonAs={copyButtonAs}
            />
          );
        } else if (fragment.type === 'html') {
          return (
            <MarkdownRenderer key={fragment.key} copyButtonProps={copyButtonProps}>
              {fragment.content}
            </MarkdownRenderer>
          );
        }
      })}
    </div>
  );
});

export default CodeView;
