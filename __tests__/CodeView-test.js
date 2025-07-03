import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeView from '../src/CodeView';
import MarkdownRenderer from '../src/MarkdownRenderer';

// Mock the MarkdownRenderer component
jest.mock('../src/MarkdownRenderer', () => 
  jest.fn(({ children }) => (
    <div data-testid="mock-markdown-renderer">{children}</div>
  ))
);

describe('CodeView', () => {
  it('renders without crashing', () => {
    render(<CodeView sourceCode="const a = 1;" />);
    expect(screen.getByTestId('mock-markdown-renderer')).toBeInTheDocument();
  });

  it('passes copyButtonProps to MarkdownRenderer', () => {
    const mockCopyButtonProps = {
      'data-testid': 'custom-copy-btn',
      className: 'custom-class',
    };

    render(
      <CodeView 
        sourceCode="const a = 1;" 
        copyButtonProps={mockCopyButtonProps} 
      />
    );

    // Check if MarkdownRenderer was called with the correct props
    expect(MarkdownRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        copyButtonProps: mockCopyButtonProps
      }),
      expect.anything()
    );
  });

  it('passes sourceCode to Renderer', () => {
    const sourceCode = 'const a = 1;';
    render(<CodeView sourceCode={sourceCode} />);
    
    // Check if the source code is passed down to the MarkdownRenderer
    expect(MarkdownRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        children: sourceCode
      }),
      expect.anything()
    );
  });
});
