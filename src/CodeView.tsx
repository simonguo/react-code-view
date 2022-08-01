/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import parseHTML from './utils/parseHTML';
import Renderer, { RendererProps } from './Renderer';

export interface CodeViewProps extends RendererProps {
  /** The code to be rendered is executed. Usually imported via markdown-loader. */
  children?: any;

  /** The code to be rendered is executed */
  sourceCode?: string;
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
    renderToolbar,
    onChange,
    beforeCompile,
    afterCompile,
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
              dependencies={dependencies}
              transformOptions={transformOptions}
              renderToolbar={renderToolbar}
              onChange={onChange}
              beforeCompile={beforeCompile}
              afterCompile={afterCompile}
              editor={editor}
            />
          );
        } else if (fragment.type === 'html') {
          return <MarkdownRenderer key={fragment.key}>{fragment.content}</MarkdownRenderer>;
        }
      })}
    </div>
  );
});

export default CodeView;
