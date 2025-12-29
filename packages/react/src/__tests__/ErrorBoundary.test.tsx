import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const ThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('should catch errors and display error message', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();

    console.error = originalError;
  });

  it('should render custom fallback', () => {
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();

    console.error = originalError;
  });

  it('should call onError callback when error occurs', () => {
    const originalError = console.error;
    console.error = () => {};

    let caughtError: unknown = null;
    const handleError = (error: unknown) => {
      caughtError = error;
    };

    render(
      <ErrorBoundary onError={handleError}>
        <ThrowError message="Callback test" />
      </ErrorBoundary>
    );

    expect(caughtError).toBeInstanceOf(Error);
    expect((caughtError as Error).message).toBe('Callback test');

    console.error = originalError;
  });
});
