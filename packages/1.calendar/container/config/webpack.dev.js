const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3020/',
    uniqueName: 'calendars',
    crossOriginLoading: 'anonymous',
  },
  entry: './src/index.js',
  devServer: {
    host: 'localhost',
    port: 3020,
    hot: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    client: {
      webSocketURL: 'ws://localhost:3020/ws',
      overlay: { warnings: false, errors: false },
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'calendars',
      filename: 'remoteEntry.js',
      exposes: { './CalendarsApp': './src/bootstrap' },
      remotes: {
        calMarketing: 'calMarketing@http://localhost:3021/remoteEntry.js',
        calAdmin: 'calAdmin@http://localhost:3022/remoteEntry.js',
        calAnalytics: 'calAnalytics@http://localhost:3023/remoteEntry.js',
        availability: 'availability@http://localhost:3024/remoteEntry.js',
        collaborations: 'collaborations@http://localhost:3025/remoteEntry.js',
        calevents: 'calevents@http://localhost:3026/remoteEntry.js',
        calintegrate: 'calintegrate@http://localhost:3027/remoteEntry.js',
        calinvite: 'calinvite@http://localhost:3028/remoteEntry.js',
        calnotify: 'calnotify@http://localhost:3029/remoteEntry.js',
        calrecur: 'calrecur@http://localhost:3030/remoteEntry.js',
        calsearch: 'calsearch@http://localhost:3031/remoteEntry.js',
        calsettings: 'calsettings@http://localhost:3032/remoteEntry.js',
        calviews: 'calviews@http://localhost:3033/remoteEntry.js',
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
