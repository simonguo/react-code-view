/**
 * Rollup plugin for react-code-view
 *
 * @example
 * ```js
 * // rollup.config.js
 * import reactCodeView from '@react-code-view/unplugin/rollup';
 *
 * export default {
 *   plugins: [
 *     reactCodeView({
 *       // options
 *     })
 *   ]
 * };
 * ```
 */

import { unpluginReactCodeView } from './core';

export default unpluginReactCodeView.rollup;
export const rollup = unpluginReactCodeView.rollup;
