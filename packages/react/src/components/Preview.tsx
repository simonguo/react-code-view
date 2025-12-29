import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export interface PreviewProps {
  /** Element to render in preview */
  children?: React.ReactNode;

  /** Error to display */
  error?: Error | null;

  /** Custom className */
  className?: string;

  /** Content to display when children is empty */
  emptyContent?: React.ReactNode;
}

/**
 * Preview component to display rendered code output
 */
export const Preview = React.memo<PreviewProps>(
  ({ children, error, className = '', emptyContent }) => {
    // Show error state
    if (error) {
      return (
        <div className={`rcv-preview rcv-preview--error ${className}`} role="alert">
          <pre className="rcv-preview__error">{error.message}</pre>
        </div>
      );
    }

    // Show empty state if no children
    if (!children && emptyContent) {
      return (
        <div className={`rcv-preview rcv-preview--empty ${className}`}>
          {emptyContent}
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div className={`rcv-preview ${className}`}>{children}</div>
      </ErrorBoundary>
    );
  }
);

Preview.displayName = 'Preview';
