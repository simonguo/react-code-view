import type { PluginOptions } from './types';
import { DEFAULT_OPTIONS } from './types';

/**
 * Normalize and merge user options with defaults
 */
export function normalizeOptions(options: PluginOptions = {}): Required<PluginOptions> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    transformOptions: {
      ...DEFAULT_OPTIONS.transformOptions,
      ...options.transformOptions
    },
    rendererOptions: {
      ...DEFAULT_OPTIONS.rendererOptions,
      ...options.rendererOptions
    }
  };
}

/**
 * Check if a file should be processed based on options
 */
export function shouldProcess(id: string, options: Required<PluginOptions>): boolean {
  // Check custom filter first
  if (!options.filter(id)) {
    return false;
  }

  // Check exclusions
  for (const pattern of options.exclude) {
    if (typeof pattern === 'string') {
      if (id.includes(pattern)) return false;
    } else if (pattern instanceof RegExp) {
      if (pattern.test(id)) return false;
    }
  }

  // Check inclusions
  for (const ext of options.include) {
    if (id.endsWith(ext)) return true;
  }

  return false;
}

/**
 * Get file extension from path
 */
export function getExtension(id: string): string {
  const lastDot = id.lastIndexOf('.');
  return lastDot >= 0 ? id.slice(lastDot) : '';
}

/**
 * Convert a string to a valid JavaScript identifier
 */
export function toValidIdentifier(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9_$]/g, '_')
    .replace(/^(\d)/, '_$1');
}
