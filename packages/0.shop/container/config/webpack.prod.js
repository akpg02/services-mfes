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
    publicPath: `/shop/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      remotes: {
        marketing: `marketing@${domain}/shop/marketing/container/latest/remoteEntry.js`,
        products: `products@${domain}/shop/products/container/latest/remoteEntry.js`,
        carts: `carts@${domain}/shop/cart/container/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/shop/dashboard/container/latest/remoteEntry.js`,
        reviews: `reviews@${domain}/shop/reviews/container/latest/remoteEntry.js`,
        chat: `chat@${domain}/shop/chat/container/latest/remoteEntry.js`,
        checkout: `checkout@${domain}/shop/checkout/container/latest/remoteEntry.js`,
        orders: `orders@${domain}/shop/orders/container/latest/remoteEntry.js`,
        payments: `payments@${domain}/shop/payments/container/latest/remoteEntry.js`,
        product: `product@${domain}/shop/product/container/latest/remoteEntry.js`,
        recommendations: `recommendations@${domain}/shop/recommendations/container/latest/remoteEntry.js`,
        search: `search@${domain}/shop/search/container/latest/remoteEntry.js`,
        wishlist: `wishlist@${domain}/shop/wishlist/container/latest/remoteEntry.js`,
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
