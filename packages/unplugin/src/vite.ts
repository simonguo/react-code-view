/**
 * Vite plugin for react-code-view
 *
 * @example
 * ```js
 * // vite.config.js
 * import { defineConfig } from 'vite';
 * import reactCodeView from '@react-code-view/unplugin/vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     reactCodeView({
 *       // options
 *     })
 *   ]
 * });
 * ```
 */

import { unpluginReactCodeView } from './core';

export default unpluginReactCodeView.vite;
export const vite = unpluginReactCodeView.vite;
