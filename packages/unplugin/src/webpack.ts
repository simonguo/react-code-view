/**
 * Webpack plugin for react-code-view
 *
 * @example
 * ```js
 * // webpack.config.js
 * const ReactCodeViewPlugin = require('@react-code-view/unplugin/webpack');
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

// Export as default for both ESM and CJS
const webpackPlugin = unpluginReactCodeView.webpack;

export default webpackPlugin;
export { webpackPlugin as webpack };

// Ensure CJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = webpackPlugin;
  module.exports.default = webpackPlugin;
  module.exports.webpack = webpackPlugin;
}
