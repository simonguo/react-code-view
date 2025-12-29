/**
 * Webpack plugin for react-code-view
 *
 * @example
 * ```js
 * // webpack.config.js
 * const { webpack: ReactCodeViewPlugin } = require('@react-code-view/unplugin');
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

export default unpluginReactCodeView.webpack;
export const webpack = unpluginReactCodeView.webpack;
