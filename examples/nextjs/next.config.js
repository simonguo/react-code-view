const ReactCodeViewPlugin = require('@react-code-view/unplugin/webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-code-view/react', '@react-code-view/core'],
  webpack: (config) => {
    config.plugins.push(ReactCodeViewPlugin());
    return config;
  }
};

module.exports = nextConfig;
