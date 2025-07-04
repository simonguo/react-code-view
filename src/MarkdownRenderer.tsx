import React, { useEffect, useRef, forwardRef } from 'react';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import mergeRefs from './utils/mergeRefs';
import { iconPath as copyIconPath, svgTpl } from './icons/Copy';
import { iconPath as checkIconPath } from './icons/Check';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Markdown content as HTML string
   */
  children?: string | null;

  /**
   * Props to be passed to the copy button
   */
  copyButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
}

/**
 * Creates and appends a copy button to a code container
 * @param container - The container element to append the copy button to
 * @param buttonProps - Additional props to apply to the copy button
 */
function createCopyButton(
  container?: HTMLDivElement | null,
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>
): void {
  // If the container is null or the container already has a copy button, return
  if (!container || container.querySelector('button[data-type="copy"]')) {
    return;
  }

  const { className, ...rest } = buttonProps || {};
  const button = document.createElement('button');
  button.dataset['type'] = 'copy';
  button.title = 'Copy code';
  button.setAttribute('aria-label', 'Copy code');
  button.innerHTML = svgTpl(copyIconPath);

  if (className) {
    button.className = className;
  }

  button.onclick = (e: MouseEvent) => {
    e.preventDefault();
    const code = container.querySelector('code')?.textContent;
    const icon = button.querySelector('.copy-icon-path');

    // Show check icon to indicate successful copy
    icon?.setAttribute('d', checkIconPath);

    if (code) {
      copy(code);
    }

    // Reset to copy icon after 2 seconds
    setTimeout(() => {
      icon?.setAttribute('d', copyIconPath);
    }, 2000);
  };

  // Apply additional button properties
  if (rest) {
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined) {
        button.setAttribute(key, String(value));
      }
    });
  }

  container.appendChild(button);
}

/**
 * Renders markdown content with code blocks that have copy buttons
 */
const MarkdownRenderer = forwardRef<HTMLDivElement, MarkdownRendererProps>(
  (props: MarkdownRendererProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, copyButtonProps, ...rest } = props;
    const mdRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Add copy buttons to all code blocks
      const codeBlocks = mdRef.current?.querySelectorAll('.rcv-code-renderer');
      codeBlocks?.forEach(codeBlock => {
        createCopyButton(codeBlock as HTMLDivElement, copyButtonProps);
      });
      // We only want to run this once when the component mounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
