const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `${domain}/search/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'search',
      filename: 'remoteEntry.js',
      exposes: {
        './SearchApp': './src/bootstrap',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        'react-router': {
          singleton: true,
          requiredVersion: deps['react-router'],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
