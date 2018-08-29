import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
    onError: PropTypes.func
  };
  componentDidCatch(error, info) {
    const { onError } = this.props;
    onError && onError(error, info);
  }

  render() {
    const { hasError, errorMessage, children } = this.props;
    if (hasError) {
      return <pre className="code-view-error">{errorMessage}</pre>;
    }
    return children;
  }
}

export default ErrorBoundary;
