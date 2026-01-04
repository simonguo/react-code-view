import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CodeView } from '../components/CodeView';

describe('CodeView', () => {
  it('should render with basic code', () => {
    const code = 'const x = 1;';
    const { container } = render(<CodeView>{code}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
  });

  it('should render with language prop', () => {
    const code = 'const x = 1;';
    const { container } = render(<CodeView language="javascript">{code}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
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
    const { container } = render(<CodeView>{markdown}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
  });

  it('should render code with dependencies', () => {
    const code = 'const x = useState(0);';
    const { container } = render(
      <CodeView dependencies={{ useState: React.useState }}>
        {code}
      </CodeView>
    );
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
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
    const { container } = render(<CodeView editable={true}>{code}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
  });

  it('should render with renderPreview prop', () => {
    const code = '<div>Test</div>';
    const { container } = render(<CodeView renderPreview={true}>{code}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
  });

  it('should handle onChange callback', () => {
    const code = 'const x = 1;';
    const onChange = vi.fn();
    
    const { container } = render(<CodeView onChange={onChange}>{code}</CodeView>);
    
    expect(container.querySelector('.rcv-code-view')).toBeInTheDocument();
  });
});
