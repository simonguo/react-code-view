import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Preview } from '../components/Preview';

describe('Preview', () => {
  it('should render children', () => {
    render(
      <Preview>
        <div>Test Content</div>
      </Preview>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render with error', () => {
    const error = new Error('Test error');
    render(<Preview error={error}>Content</Preview>);
    
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Preview className="custom-class">
        <div>Content</div>
      </Preview>
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render empty preview', () => {
    const { container } = render(<Preview>{null}</Preview>);
    
    expect(container.querySelector('.rcv-preview')).toBeInTheDocument();
  });

  it('should render with emptyContent', () => {
    render(
      <Preview emptyContent={<div>Empty State</div>}>
        {null}
      </Preview>
    );
    
    expect(screen.getByText('Empty State')).toBeInTheDocument();
  });

  it('should render React elements', () => {
    render(
      <Preview>
        <button>Click me</button>
      </Preview>
    );
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <Preview>
        <div>Child 1</div>
        <div>Child 2</div>
      </Preview>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should handle string content', () => {
    render(<Preview>Plain text content</Preview>);
    
    expect(screen.getByText('Plain text content')).toBeInTheDocument();
  });

  it('should render with error boundary', () => {
    const error = new Error('Component error');
    render(<Preview error={error}>Content</Preview>);
    
    expect(screen.getByText(/Component error/)).toBeInTheDocument();
  });
});
