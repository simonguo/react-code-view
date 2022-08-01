import React from 'react';
import { render } from '@testing-library/react';
import Preview from '../src/Preview';

it('renders without crashing', () => {
  const { container } = render(<Preview />);
  expect(container).toBeTruthy();
});

it('render a loader', () => {
  const { container } = render(<Preview />);
  expect(container.querySelector('.rcv-render-loader')).toBeTruthy();
});

it('render child elements', () => {
  const { getByText } = render(
    <Preview>
      <button>test</button>
    </Preview>
  );
  expect(getByText('test')).toBeTruthy();
});
