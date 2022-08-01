import React from 'react';
import { render } from '@testing-library/react';
import Renderer from '../src/Renderer';

it('refault is rendering', () => {
  const { container } = render(<Renderer />);
  expect(container.querySelector('.rcv-render')).toHaveTextContent('Rendering...');
});

it('should render a test div', () => {
  const { container } = render(<Renderer code="ReactDOM.render(<div>test</div>)" />);

  expect(container.querySelector('.rcv-render')).toContainHTML('<div>test</div>');
});
