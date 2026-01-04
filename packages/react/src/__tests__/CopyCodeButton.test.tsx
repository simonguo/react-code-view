import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CopyCodeButton } from '../components/CopyCodeButton';

// Mock copy-to-clipboard
vi.mock('copy-to-clipboard', () => ({
  default: vi.fn(() => true)
}));

describe('CopyCodeButton', () => {
  it('should render copy button', () => {
    render(<CopyCodeButton code="const x = 1;" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show copy icon by default', () => {
    const { container } = render(<CopyCodeButton code="const x = 1;" />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should handle click event', () => {
    render(<CopyCodeButton code="const x = 1;" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Button should still be in the document after click
    expect(button).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <CopyCodeButton code="const x = 1;" className="custom-class" />
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should handle empty code', () => {
    render(<CopyCodeButton code="" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should handle multiline code', () => {
    const code = 'const x = 1;\nconst y = 2;\nconst z = 3;';
    render(<CopyCodeButton code={code} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be clickable', () => {
    render(<CopyCodeButton code="test code" />);
    
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});
