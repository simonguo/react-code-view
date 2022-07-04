import React from 'react';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | null;
}

const MarkdownRenderer = React.forwardRef(
  (props: MarkdownRendererProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, ...rest } = props;
    if (!children) {
      return null;
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={className || 'markdown'}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }
);

export default MarkdownRenderer;
