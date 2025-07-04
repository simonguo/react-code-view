import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import copy from 'copy-to-clipboard';
import MarkdownRenderer from '../src/MarkdownRenderer';

// Mock the copy-to-clipboard library
jest.mock('copy-to-clipboard');

// Mock document.execCommand which is used as a fallback
beforeEach(() => {
  document.execCommand = jest.fn();
  document.createRange = () => ({
    setStart: () => true,
    setEnd: () => true,
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
  window.getSelection = () => ({
    removeAllRanges: () => undefined,
    addRange: () => undefined,
    toString: () => '',
  });

  // Mock the clipboard API
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
    writable: true,
    configurable: true,
  });

  // Reset all mocks
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('MarkdownRenderer', () => {
  it('renders without crashing', () => {
    render(<MarkdownRenderer>{'<h2>Test</h2>'}</MarkdownRenderer>);
    expect(screen.getByText('Test').tagName).toBe('H2');
  });

  it('renders code blocks with copy button', () => {
    const { container } = render(
      <MarkdownRenderer>
        {`<div class="rcv-code-renderer"><pre><code>const a = 1;</code></pre></div>`}
      </MarkdownRenderer>
    );

    const codeBlock = container.querySelector('.rcv-code-renderer');
    expect(codeBlock).toBeInTheDocument();

    // Check if copy button is rendered with the correct class
    const copyButton = container.querySelector('button[title="Copy code"]');
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute('data-type', 'copy');
  });

  it('applies custom copy button props', () => {
    const customProps = {
      'data-testid': 'custom-copy-button',
      class: 'custom-button-class',
      onClick: jest.fn(),
    };

    const { container } = render(
      <MarkdownRenderer copyButtonProps={customProps}>
        {`<div class="rcv-code-renderer"><pre><code>const a = 1;</code></pre></div>`}
      </MarkdownRenderer>
    );

    const copyButton = container.querySelector('button[title="Copy code"]');
    expect(copyButton).toHaveAttribute('data-testid', 'custom-copy-button');
    expect(copyButton.getAttribute('class')).toEqual('custom-button-class');
    expect(copyButton.getAttribute('data-testid')).toEqual('custom-copy-button');
  });

  it('copies code to clipboard when copy button is clicked', () => {
    const { container } = render(
      <MarkdownRenderer>
        {`<div class="rcv-code-renderer"><pre><code>const test = 'test';</code></pre></div>`}
      </MarkdownRenderer>
    );

    const copyButton = container.querySelector('button[title="Copy code"]');
    fireEvent.click(copyButton);

    // Check if copy-to-clipboard was called with the correct code
    expect(copy).toHaveBeenCalledWith('const test = \'test\';');
  });

  it('copies code using copy-to-clipboard', () => {
    const { container } = render(
      <MarkdownRenderer>
        {`<div class="rcv-code-renderer"><pre><code>const test = 'test';</code></pre></div>`}
      </MarkdownRenderer>
    );

    const copyButton = container.querySelector('button[title="Copy code"]');
    fireEvent.click(copyButton);

    // Verify copy was called with the correct text (including the semicolon)
    expect(copy).toHaveBeenCalledWith('const test = \'test\';');
    
    // Verify the copy button exists and has the correct title
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute('title', 'Copy code');
    
    // Verify the copy function was called with the correct text
    expect(copy).toHaveBeenCalledWith('const test = \'test\';');
  });

  it('adds copy button by default', () => {
    const { container } = render(
      <MarkdownRenderer>
        {`<div class="rcv-code-renderer"><pre><code>with copy</code></pre></div>`}
      </MarkdownRenderer>
    );

    const copyButton = container.querySelector('button[title="Copy code"]');
    expect(copyButton).toBeInTheDocument();
  });

  it('handles multiple code blocks', () => {
    const { container } = render(
      <MarkdownRenderer>
        {`
          <div class="rcv-code-renderer"><pre><code>first block</code></pre></div>
          <div class="rcv-code-renderer"><pre><code>second block</code></pre></div>
        `}
      </MarkdownRenderer>
    );

    const copyButtons = container.querySelectorAll('button[title="Copy code"]');
    expect(copyButtons).toHaveLength(2);
    
    // Test first button
    fireEvent.click(copyButtons[0]);
    expect(copy).toHaveBeenCalledWith('first block');
    
    // Test second button
    fireEvent.click(copyButtons[1]);
    expect(copy).toHaveBeenCalledWith('second block');
  });
});
