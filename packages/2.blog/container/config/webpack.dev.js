const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3035/',
    uniqueName: 'blogs',
    crossOriginLoading: 'anonymous',
  },
  entry: './src/index.js',
  devServer: {
    host: 'localhost',
    port: 3035,
    hot: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    client: {
      webSocketURL: 'ws://localhost:3035/ws',
      overlay: { warnings: false, errors: false },
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'blogs',
      filename: 'remoteEntry.js',
      exposes: { './BlogsApp': './src/bootstrap' },
      remotes: {
        blogMarketing: 'blogMarketing@http://localhost:3036/remoteEntry.js',
        authors: 'authors@http://localhost:3037/remoteEntry.js',
        blogDashboard: 'blogDashboard@http://localhost:3038/remoteEntry.js',
        blogPosts: 'blogPosts@http://localhost:3039/remoteEntry.js',
        blogComments: 'blogComments@http://localhost:3040/remoteEntry.js',
        blogNews: 'blogNews@http://localhost:3041/remoteEntry.js',
        blogRelated: 'blogRelated@http://localhost:3042/remoteEntry.js',
        blogSearch: 'blogSearch@http://localhost:3043/remoteEntry.js',
        blogSocial: 'blogSocial@http://localhost:3044/remoteEntry.js',
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
