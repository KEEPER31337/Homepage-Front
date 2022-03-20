const { override, addBabelPlugins } = require('customize-cra');

const isProduction = process.env.REACT_APP_MODE === 'production';

module.exports = {
  webpack: isProduction
    ? override(addBabelPlugins('transform-remove-console'))
    : function override(config, env) {
        return config;
      },
};
