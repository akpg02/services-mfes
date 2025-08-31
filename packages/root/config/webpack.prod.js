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
    publicPath: `/root/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'root',
      filename: 'remoteEntry.js',
      remotes: {
        marketing: `marketing@${domain}/marketing/container/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/container/latest/remoteEntry.js`,
        about: `about@${domain}/about/container/latest/remoteEntry.js`,
        challenges: `challenges@${domain}/challenges/container/latest/remoteEntry.js`,
        contact: `contact@${domain}/contact/container/latest/remoteEntry.js`,
        projects: `projects@${domain}/projects/container/latest/remoteEntry.js`,
        shop: `shop@${domain}/shop/container/latest/remoteEntry.js`,
        calendars: `calendars@${domain}/calendars/container/latest/remoteEntry.js`,
      },
      shared: {
        ...deps,
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
