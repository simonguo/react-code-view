import { render } from '@testing-library/react';
import ErrorBoundary from '../src/ErrorBoundary';

it('renders error message', () => {
  const { getByText } = render(<ErrorBoundary hasError errorMessage="test message" />);

  expect(getByText('test message')).toBeTruthy();
});

it('render child elements', () => {
  const { getByText } = render(<ErrorBoundary>child</ErrorBoundary>);
  expect(getByText('child')).toBeTruthy();
});
