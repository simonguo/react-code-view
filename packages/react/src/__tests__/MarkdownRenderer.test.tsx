import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('should render markdown heading', () => {
    const markdown = '# Hello World';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render markdown paragraph', () => {
    const markdown = 'This is a paragraph.';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
  });

  it('should render markdown with code blocks', () => {
    const markdown = '```js\nconst x = 1;\n```';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText(/const x = 1/)).toBeInTheDocument();
  });

  it('should render markdown with links', () => {
    const markdown = '[Link](https://example.com)';
    render(<MarkdownRenderer markdown={markdown} />);
    
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('should render markdown with lists', () => {
    const markdown = '- Item 1\n- Item 2\n- Item 3';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should handle empty markdown', () => {
    const { container } = render(<MarkdownRenderer markdown="" />);
    
    expect(container.querySelector('.rcv-markdown')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const markdown = '# Test';
    const { container } = render(
      <MarkdownRenderer markdown={markdown} className="custom-class" />
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render markdown with bold and italic', () => {
    const markdown = '**Bold** and *italic* text';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText(/Bold/)).toBeInTheDocument();
    expect(screen.getByText(/italic/)).toBeInTheDocument();
  });

  it('should render markdown with inline code', () => {
    const markdown = 'Use `const` for constants';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText(/const/)).toBeInTheDocument();
  });

  it('should render multiple headings', () => {
    const markdown = '# H1\n## H2\n### H3';
    render(<MarkdownRenderer markdown={markdown} />);
    
    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByText('H2')).toBeInTheDocument();
    expect(screen.getByText('H3')).toBeInTheDocument();
  });
});
