import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CheckIcon, CopyIcon } from '../icons';
import { canUseDOM } from '../utils';

export interface CopyCodeButtonProps {
  /** Code to copy to clipboard */
  code: string;

  /** Duration to show success state (ms) */
  successDuration?: number;

  /** Custom className */
  className?: string;

  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Button to copy code to clipboard
 */
export const CopyCodeButton = React.memo<CopyCodeButtonProps>(
  ({ code, successDuration = 2000, className = '', ...props }) => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCopy = useCallback(async () => {
      if (!canUseDOM || !navigator.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, successDuration);
      } catch (error) {
        console.error('[react-code-view] Failed to copy code:', error);
      }
    }, [code, successDuration]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <button
        type="button"
        className={`rcv-copy-button ${copied ? 'rcv-copy-button--copied' : ''} ${className}`}
        onClick={handleCopy}
        aria-label={props['aria-label'] || (copied ? 'Copied!' : 'Copy code')}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    );
  }
);

CopyCodeButton.displayName = 'CopyCodeButton';
