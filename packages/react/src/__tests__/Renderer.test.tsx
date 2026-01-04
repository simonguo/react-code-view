import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Renderer } from '../components/Renderer';

describe('Renderer', () => {
  it('should render code with default language', () => {
    const code = 'const x = 1;';
    render(<Renderer code={code} />);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should render code with specified language', () => {
    const code = 'function test() {}';
    render(<Renderer code={code} language="javascript" />);
    
    expect(screen.getByText(/function test/)).toBeInTheDocument();
  });

  it('should render with custom theme', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <Renderer code={code} theme="github-dark" />
    );
    
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should handle empty code', () => {
    const { container } = render(<Renderer code="" />);
    
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should render multiline code', () => {
    const code = 'const x = 1;\nconst y = 2;\nconst z = 3;';
    render(<Renderer code={code} />);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
    expect(screen.getByText(/const y = 2/)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <Renderer code={code} className="custom-class" />
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render code in pre tag', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <Renderer code={code} />
    );
    
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should handle special characters in code', () => {
    const code = 'const str = "<div>Test & \'quotes\'</div>";';
    render(<Renderer code={code} />);
    
    expect(screen.getByText(/const str/)).toBeInTheDocument();
  });
});
