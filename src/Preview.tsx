import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const Preview = ({ children, ...rest }) => (
  <ErrorBoundary {...rest}>
    <div className="rcv-render">
      {children ? children : <div className="rcv-render-loader">Rendering...</div>}
    </div>
  </ErrorBoundary>
);

export default Preview;
