import React from 'react';
import UnpluginDemo from '../docs/unplugin-demo.md';

export default function UnpluginPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Unplugin Markdown Import Demo</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
        This page demonstrates importing markdown files directly as React components using <code>@react-code-view/unplugin</code>
      </p>
      
      <UnpluginDemo 
        theme="rcv-theme-default"
        dependencies={{ useState: React.useState }}
      />
    </div>
  );
}
