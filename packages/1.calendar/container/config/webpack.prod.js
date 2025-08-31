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
    publicPath: `/calendars/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'calendars',
      filename: 'remoteEntry.js',
      remotes: {
        calMarketing: `calMarketing@http://${domain}/calendar/calMarketing/container/latest/remoteEntry.js`,
        admin: `admin@http://${domain}/calendar/admin/container/latest/remoteEntry.js`,
        analytics: `analytics@http://${domain}/calendar/analytics/container/latest/remoteEntry.js`,
        availability: `availability@http://${domain}/calendar/availability/container/latest/remoteEntry.js`,
        collaboration: `collaboration@http://${domain}/calendar/collaboration/container/latest/remoteEntry.js`,
        events: `events@http://${domain}/calendar/events/container/latest/remoteEntry.js`,
        integrations: `integrations@http://${domain}/calendar/integrations/container/latest/remoteEntry.js`,
        invitations: `invitations@http://${domain}/calendar/invitations/container/latest/remoteEntry.js`,
        notifications: `notifications@http://${domain}/calendar/notifications/container/latest/remoteEntry.js`,
        recurrences: `recurrences@http://${domain}/calendar/recurrences/container/latest/remoteEntry.js`,
        search: `search@http://${domain}/calendar/search/container/latest/remoteEntry.js`,
        settings: `settings@http://${domain}/calendar/settings/container/latest/remoteEntry.js`,
        views: `views@http://${domain}/calendar/views/container/latest/remoteEntry.js`,
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
