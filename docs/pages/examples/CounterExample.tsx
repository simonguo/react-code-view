import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';

interface CounterExampleProps {
  theme: string;
}

export const CounterExample: React.FC<CounterExampleProps> = ({ theme }) => {
  const counterCode = `const App = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
};

render(<App />);`;

  return (
    <div className="page-content">
      <Section id="counter" title="Counter Example">
        <p>A simple counter to demonstrate live code editing and preview.</p>

        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            dependencies={{ useState: React.useState }}
          >
            {counterCode}
          </CodeView>
        </div>

        <ul>
          <li>Click "Show Code" to view and edit the source</li>
          <li>Preview updates instantly while you type</li>
          <li>Click the copy button to reuse the code</li>
        </ul>
      </Section>
    </div>
  );
};
