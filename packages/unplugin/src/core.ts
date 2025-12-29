import { createUnplugin } from 'unplugin';
import type { PluginOptions } from './types';
import { normalizeOptions, shouldProcess } from './utils';
import { transformMarkdown } from './transform';

const PLUGIN_NAME = 'unplugin-react-code-view';

/**
 * Universal plugin for processing markdown files in build tools
 * Supports: Webpack, Vite, Rollup, esbuild, Rspack
 */
export const unpluginReactCodeView = createUnplugin<PluginOptions | undefined>(
  (userOptions = {}) => {
    const options = normalizeOptions(userOptions);

    return {
      name: PLUGIN_NAME,

      // Transform hook for processing files
      transformInclude(id) {
        return shouldProcess(id, options);
      },

      transform(code, id) {
        if (!shouldProcess(id, options)) {
          return null;
        }

        try {
          return transformMarkdown(code, id, options);
        } catch (error) {
          this.error(`[${PLUGIN_NAME}] Failed to transform ${id}: ${error}`);
          return null;
        }
      },

      // Vite-specific: add .md to optimizeDeps
      vite: {
        config() {
          return {
            optimizeDeps: {
              extensions: options.include
            }
          };
        }
      },

      // Rollup-specific: resolve .md files
      rollup: {
        resolveId(id) {
          if (shouldProcess(id, options)) {
            return id;
          }
          return null;
        }
      }
    };
  }
);

// Export types
export type { PluginOptions } from './types';
export { DEFAULT_OPTIONS } from './types';
