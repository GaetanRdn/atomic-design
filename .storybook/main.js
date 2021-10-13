module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-jest',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    // Workaround for @storybook/addon-jest on Webpack 5
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    };

    return config;
  },
};
