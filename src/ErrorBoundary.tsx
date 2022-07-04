import React, { ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  onError?: (error: Error, info: ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error, info) {
    this.props.onError?.(error, info);
  }

  render() {
    const { hasError, errorMessage, children } = this.props;
    if (hasError) {
      return <pre className="react-code-view-error">{errorMessage}</pre>;
    }
    return children;
  }
}

export default ErrorBoundary;
