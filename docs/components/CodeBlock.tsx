import React, { useState } from 'react';
import { Renderer } from '@react-code-view/react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showCopy?: boolean;
  theme?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  title,
  showCopy = true,
  theme = 'github-light'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {title && (
        <div className="code-block-header">
          <span className="code-block-title">{title}</span>
          {showCopy && (
            <button 
              className="copy-button"
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              <span className="copy-text">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}
      <div className="code-block-content">
        <Renderer code={code} language={language} theme={theme} />
      </div>
    </div>
  );
};
