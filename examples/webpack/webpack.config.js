const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactCodeViewPlugin = require('@react-code-view/unplugin/webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    ReactCodeViewPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'React Code View - Webpack Example'
    }),
  ],
  devServer: {
    port: 3001,
    hot: true,
    open: true,
  },
};
