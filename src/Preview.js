import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default ({ children, ...rest }) => (
  <ErrorBoundary {...rest}>
    <div className="code-view">{children}</div>
  </ErrorBoundary>
);
