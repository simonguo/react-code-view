import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';
import demoMarkdown from './demo.md?raw';

interface MarkdownExampleProps {
  theme: string;
}

export const MarkdownExample: React.FC<MarkdownExampleProps> = ({ theme }) => {
  return (
    <div className="page-content">
      <Section id="markdown" title="Markdown with Code Blocks">
        <p>
          CodeView natively supports parsing markdown files with embedded code blocks.
          Use <code>&lt;!--start-code--&gt;</code> and <code>&lt;!--end-code--&gt;</code> 
          comments to mark executable code sections.
        </p>

        <div className="example-demo">
          <CodeView
            theme={theme}
            dependencies={{ useState: React.useState }}
          >
            {demoMarkdown}
          </CodeView>
        </div>

        <h3>How it works</h3>
        <ul>
          <li>Import markdown files as raw strings</li>
          <li>CodeView automatically detects and parses code blocks marked with special comments</li>
          <li>Markdown content is rendered between code blocks</li>
          <li>Code blocks are fully interactive and editable</li>
          <li>Perfect for documentation with live examples</li>
        </ul>

        <h3>Markdown syntax</h3>
        <pre style={{ 
          background: '#f6f8fa', 
          padding: '16px', 
          borderRadius: '6px',
          overflow: 'auto'
        }}>
{`# Your Markdown Content

Regular markdown text here...

<!--start-code-->
\`\`\`jsx
import React from 'react';

function MyComponent() {
  return <div>Interactive code!</div>;
}

render(<MyComponent />);
\`\`\`
<!--end-code-->

More markdown content...`}
        </pre>
      </Section>
    </div>
  );
};
