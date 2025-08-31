const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'auto',
    uniqueName: 'shop_container',
    crossOriginLoading: 'anonymous',
  },
  entry: './src/index.js',
  devServer: {
    port: 3007,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: { './ShopApp': './src/bootstrap' },
      remotes: {
        shopMarketing: 'shopMarketing@http://localhost:3008/remoteEntry.js',
        products: 'products@http://localhost:3009/remoteEntry.js',
        carts: 'carts@http://localhost:3010/remoteEntry.js',
        shopDashboard: 'shopDashboard@http://localhost:3011/remoteEntry.js',
        reviews: 'reviews@http://localhost:3012/remoteEntry.js',
        chats: 'chats@http://localhost:3013/remoteEntry.js',
        checkout: 'checkout@http://localhost:3014/remoteEntry.js',
        orders: 'orders@http://localhost:3015/remoteEntry.js',
        payments: 'payments@http://localhost:3016/remoteEntry.js',
        recommendations: 'recommendations@http://localhost:3017/remoteEntry.js',
        search: 'search@http://localhost:3018/remoteEntry.js',
        wishlists: 'wishlists@http://localhost:3019/remoteEntry.js',
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
