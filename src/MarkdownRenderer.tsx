import React, { useEffect } from 'react';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import mergeRefs from './utils/mergeRefs';
import { iconPath as copyPath, svgTpl } from './icons/Copy';
import { iconPath as checkPath } from './icons/Check';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | null;
}

function appendCopyButton(container?: HTMLDivElement | null) {
  if (!container) {
    return;
  }

  const button = document.createElement('button');
  button.className =
    'copy-code-button rs-btn-icon rs-btn-icon-circle rs-btn rs-btn-subtle rs-btn-xs';
  button.title = 'Copy code';
  button.innerHTML = svgTpl(copyPath);
  button.onclick = e => {
    e.preventDefault();
    const code = container?.querySelector('code')?.textContent;
    const icon = button.querySelector('.copy-icon-path');

    icon?.setAttribute('d', checkPath);
    if (code) {
      copy(code);
    }

    setTimeout(() => {
      icon?.setAttribute('d', copyPath);
    }, 2000);
  };
  container?.appendChild(button);
}

const MarkdownRenderer = React.forwardRef(
  (props: MarkdownRendererProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, ...rest } = props;
    const mdRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      mdRef.current?.querySelectorAll('.rcv-code-renderer').forEach((el: any) => {
        appendCopyButton(el);
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
