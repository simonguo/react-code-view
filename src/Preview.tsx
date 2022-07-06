import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const Preview = ({ children, ...rest }) => (
  <ErrorBoundary {...rest}>
    <div className="rcv-render">{children}</div>
  </ErrorBoundary>
);

export default Preview;
