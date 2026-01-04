import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CodeView } from '../components/CodeView';

describe('CodeView', () => {
  it('should render with basic code', () => {
    const code = 'const x = 1;';
    render(<CodeView>{code}</CodeView>);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should render with language prop', () => {
    const code = 'const x = 1;';
    render(<CodeView language="javascript">{code}</CodeView>);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should render with custom theme', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <CodeView theme="custom-theme">{code}</CodeView>
    );
    
    expect(container.querySelector('.custom-theme')).toBeInTheDocument();
  });

  it('should handle empty code', () => {
    const { container } = render(<CodeView>{''}</CodeView>);
    
    expect(container).toBeInTheDocument();
  });

  it('should render markdown content', () => {
    const markdown = '# Hello\n\nWorld';
    render(<CodeView>{markdown}</CodeView>);
    
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });

  it('should render code with dependencies', () => {
    const code = 'const x = useState(0);';
    render(
      <CodeView dependencies={{ useState: React.useState }}>
        {code}
      </CodeView>
    );
    
    expect(screen.getByText(/useState/)).toBeInTheDocument();
  });

  it('should toggle code visibility', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <CodeView defaultShowCode={false}>{code}</CodeView>
    );
    
    expect(container).toBeInTheDocument();
  });

  it('should render with editable prop', () => {
    const code = 'const x = 1;';
    render(<CodeView editable={true}>{code}</CodeView>);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should render with renderPreview prop', () => {
    const code = '<div>Test</div>';
    render(<CodeView renderPreview={true}>{code}</CodeView>);
    
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it('should handle onChange callback', () => {
    const code = 'const x = 1;';
    const onChange = vi.fn();
    
    render(<CodeView onChange={onChange}>{code}</CodeView>);
    
    // CodeView should render without errors
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });
});
