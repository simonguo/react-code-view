import React, { Component } from 'react';

export interface ErrorBoundaryProps {
  /** Content to render when an error occurs */
  fallback?: React.ReactNode;

  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

  /** Children to render */
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and display errors in child components
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static displayName = 'ErrorBoundary';

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.error('[react-code-view] Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="rcv-error" role="alert" aria-live="polite">
          <pre className="rcv-error__message">
            {error?.message || 'An error occurred'}
          </pre>
        </div>
      );
    }

    return children;
  }
}
