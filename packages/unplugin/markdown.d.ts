declare module '*.md' {
  import { FC } from 'react';
  
  interface MarkdownComponentProps {
    theme?: string;
    dependencies?: Record<string, any>;
    [key: string]: any;
  }
  
  const MarkdownComponent: FC<MarkdownComponentProps>;
  export default MarkdownComponent;
  export const content: string;
}

declare module '*.mdx' {
  import { FC } from 'react';
  
  interface MarkdownComponentProps {
    theme?: string;
    dependencies?: Record<string, any>;
    [key: string]: any;
  }
  
  const MarkdownComponent: FC<MarkdownComponentProps>;
  export default MarkdownComponent;
  export const content: string;
}
