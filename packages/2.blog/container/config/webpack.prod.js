// root/container/config/webpack.prod.js
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `/blogs/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'blogs',
      filename: 'remoteEntry.js',
      remotes: {
        blogMarketing: `blogMarketing@http://${domain}/blog/blogMarketing/container/latest/remoteEntry.js`,
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
