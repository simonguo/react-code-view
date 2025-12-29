/**
 * Rspack plugin for react-code-view
 *
 * @example
 * ```js
 * // rspack.config.js
 * const { rspack: ReactCodeViewPlugin } = require('@react-code-view/unplugin');
 *
 * module.exports = {
 *   plugins: [
 *     ReactCodeViewPlugin({
 *       // options
 *     })
 *   ]
 * };
 * ```
 */

import { unpluginReactCodeView } from './core';

export default unpluginReactCodeView.rspack;
export const rspack = unpluginReactCodeView.rspack;
