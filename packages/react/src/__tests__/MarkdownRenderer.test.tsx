import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('should render markdown heading', () => {
    const markdown = '# Hello World';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render markdown paragraph', () => {
    const markdown = 'This is a paragraph.';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render markdown with code blocks', () => {
    const markdown = '```js\nconst x = 1;\n```';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render markdown with links', () => {
    const markdown = '[Link](https://example.com)';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render markdown with lists', () => {
    const markdown = '- Item 1\n- Item 2\n- Item 3';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should handle empty markdown', () => {
    const { container } = render(<MarkdownRenderer>{''}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const markdown = '# Test';
    const { container } = render(
      <MarkdownRenderer className="custom-class">{markdown}</MarkdownRenderer>
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render markdown with bold and italic', () => {
    const markdown = '**Bold** and *italic* text';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render markdown with inline code', () => {
    const markdown = 'Use `const` for constants';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should render multiple headings', () => {
    const markdown = '# H1\n## H2\n### H3';
    const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });
});
