/**
 * esbuild plugin for react-code-view
 *
 * @example
 * ```js
 * // build.js
 * import * as esbuild from 'esbuild';
 * import reactCodeView from '@react-code-view/unplugin/esbuild';
 *
 * await esbuild.build({
 *   plugins: [
 *     reactCodeView({
 *       // options
 *     })
 *   ]
 * });
 * ```
 */

import { unpluginReactCodeView } from './core';

export default unpluginReactCodeView.esbuild;
export const esbuild = unpluginReactCodeView.esbuild;
