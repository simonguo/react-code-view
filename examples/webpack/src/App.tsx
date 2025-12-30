/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import '@react-code-view/react/styles/index.css';
import UnpluginPage from './pages/UnpluginPage';
import BasicPage from './pages/BasicPage';

type Page = 'unplugin' | 'basic';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('unplugin');

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 40px',
        display: 'flex',
        gap: '20px',
        backgroundColor: '#f9fafb'
      }}>
        <button
          onClick={() => setCurrentPage('unplugin')}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: currentPage === 'unplugin' ? '#007bff' : 'transparent',
            color: currentPage === 'unplugin' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '6px',
            fontWeight: currentPage === 'unplugin' ? 'bold' : 'normal'
          }}
        >
          📦 Unplugin Demo
        </button>
        <button
          onClick={() => setCurrentPage('basic')}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: currentPage === 'basic' ? '#007bff' : 'transparent',
            color: currentPage === 'basic' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '6px',
            fontWeight: currentPage === 'basic' ? 'bold' : 'normal'
          }}
        >
          ⚡ Basic Usage
        </button>
      </nav>

      {currentPage === 'unplugin' ? <UnpluginPage /> : <BasicPage />}
    </div>
  );
}

export default App;
