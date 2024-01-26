import React, { useEffect } from 'react';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import mergeRefs from './utils/mergeRefs';

interface MarkdownRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | null;
}

const copyPath =
  'M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z';
const checkPath =
  'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z';

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
