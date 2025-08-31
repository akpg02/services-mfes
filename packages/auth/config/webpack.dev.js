const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3002,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },
  output: { publicPath: 'http://localhost:3002/' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: { './AuthApp': './src/bootstrap' },
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

module.exports = merge(commonConfig, devConfig);
