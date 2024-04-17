import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Renderer from '../src/Renderer';

it('refault is rendering', () => {
  const { container } = render(<Renderer />);
  expect(container.querySelector('.rcv-render')).toHaveTextContent('Rendering...');
});

it('should render a test div', () => {
  const { container } = render(<Renderer code="ReactDOM.render(<div>test</div>)" />);

  expect(container.querySelector('.rcv-render')).toContainHTML('<div>test</div>');
});

it('should render a test div with footer', () => {
  render(<Renderer renderExtraFooter={() => <div>footer</div>} />);

  expect(screen.getByText('footer')).toBeInTheDocument();
});

it('should call onOpenEditor and onCloseEditor callback', () => {
  const onOpenEditor = jest.fn();
  const onCloseEditor = jest.fn();

  render(<Renderer onOpenEditor={onOpenEditor} onCloseEditor={onCloseEditor} />);

  fireEvent.click(screen.getByRole('switch', { name: 'Show the full source' }));

  expect(onOpenEditor).toHaveBeenCalled();

  fireEvent.click(screen.getByRole('switch', { name: 'Show the full source' }));

  expect(onCloseEditor).toHaveBeenCalled();
});
