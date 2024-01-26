import React, { useEffect } from 'react';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import mergeRefs from './utils/mergeRefs';
import { iconPath as copyPath } from './icons/Copy';
import { iconPath as checkPath } from './icons/Check';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | null;
}

const MarkdownRenderer = React.forwardRef(
  (props: MarkdownRendererProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, ...rest } = props;
    const mdRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      mdRef.current?.querySelectorAll('.copy-code-button').forEach(el => {
        el.addEventListener('click', e => {
          e.preventDefault();

          const code = (el.nextElementSibling as HTMLInputElement)?.value;
          const icon = el.querySelector('.copy-icon-path');

          icon?.setAttribute('d', checkPath);
          if (code) {
            copy(code);
          }

          setTimeout(() => {
            icon?.setAttribute('d', copyPath);
          }, 2000);
        });
      });
    }, []);

    if (!children) {
      return null;
    }

    return (
      <div
        {...rest}
        ref={mergeRefs(mdRef, ref)}
        className={classNames(className, 'rcv-markdown')}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }
);

export default MarkdownRenderer;
