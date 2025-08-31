const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3028,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
  },
  output: { publicPath: 'auto', uniqueName: 'invite' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'calinvite',
      filename: 'remoteEntry.js',
      exposes: { './InvitationsApp': './src/bootstrap' },
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

module.exports = merge(commonConfig, devConfig);
