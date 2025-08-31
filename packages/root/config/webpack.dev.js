const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  entry: './src/index.js',
  devServer: {
    port: 3000,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'root',
      filename: 'remoteEntry.js',
      remotes: {
        marketing: 'marketing@http://localhost:3001/remoteEntry.js',
        auth: 'auth@http://localhost:3002/remoteEntry.js',
        about: 'about@http://localhost:3003/remoteEntry.js',
        challenges: 'challenges@http://localhost:3004/remoteEntry.js',
        contact: 'contact@http://localhost:3005/remoteEntry.js',
        projects: 'projects@http://localhost:3006/remoteEntry.js',
        shop: 'shop@http://localhost:3007/remoteEntry.js',
        calendars: 'calendars@http://localhost:3020/remoteEntry.js',
        blogs: 'blogs@http://localhost:3035/remoteEntry.js',
        quotes: 'quotes@http://localhost:3045/remoteEntry.js',
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
    new ExternalTemplateRemotesPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
