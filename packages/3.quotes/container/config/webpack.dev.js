const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3045/',
    uniqueName: 'quotes',
    crossOriginLoading: 'anonymous',
  },
  entry: './src/index.js',
  devServer: {
    host: 'localhost',
    port: 3045,
    hot: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    client: {
      webSocketURL: 'ws://localhost:3045/ws',
      overlay: { warnings: false, errors: false },
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'quotes',
      filename: 'remoteEntry.js',
      exposes: { './QuotesApp': './src/bootstrap' },
      remotes: {
        quoteMarketing: 'quoteMarketing@http://localhost:3046/remoteEntry.js',
        quoteAuthors: 'quoteAuthors@http://localhost:3047/remoteEntry.js',
        quoteDashboard: 'quoteDashboard@http://localhost:3048/remoteEntry.js',
        quoteSearch: 'quoteSearch@http://localhost:3049/remoteEntry.js',
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

module.exports = merge(commonConfig, devConfig);
