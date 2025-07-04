import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import CopyIcon from './icons/Copy';
import CheckIcon from './icons/Check';

interface CopyCodeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  code?: string;
}

function CopyCodeButton(props: CopyCodeButtonProps) {
  const { as: Component = 'button', code, ...rest } = props;
  const [copied, setCopied] = useState(false);

  if (!code) {
    return null;
  }

  const handleClick = () => {
    setCopied(true);
    copy(code);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Component data-type="copy" onClick={handleClick} {...rest}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Component>
  );
}

export default CopyCodeButton;
