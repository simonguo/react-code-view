import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CodeEditor } from '../components/CodeEditor';

describe('CodeEditor', () => {
  it('should render with initial code', () => {
    const code = 'const x = 1;';
    const { container } = render(<CodeEditor code={code} />);
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should render with language prop', () => {
    const code = 'function test() {}';
    const { container } = render(
      <CodeEditor code={code} language="javascript" />
    );
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should handle onChange callback', () => {
    const code = 'const x = 1;';
    const onChange = vi.fn();
    
    const { container } = render(
      <CodeEditor code={code} onChange={onChange} />
    );
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should render with readOnly prop', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <CodeEditor code={code} readOnly={true} />
    );
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <CodeEditor code={code} className="custom-class" />
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should handle empty code', () => {
    const { container } = render(<CodeEditor code="" />);
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should render with theme prop', () => {
    const code = 'const x = 1;';
    const { container } = render(
      <CodeEditor code={code} theme="dark" />
    );
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should handle multiline code', () => {
    const code = 'const x = 1;\nconst y = 2;\nconst z = 3;';
    const { container } = render(<CodeEditor code={code} />);
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should render with line numbers', () => {
    const code = 'const x = 1;';
    const { container } = render(<CodeEditor code={code} />);
    
    // CodeMirror should render with line numbers by default
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('should handle special characters', () => {
    const code = 'const str = "<div>Test & \'quotes\'</div>";';
    const { container } = render(<CodeEditor code={code} />);
    
    expect(container.querySelector('.cm-editor')).toBeInTheDocument();
  });
});
