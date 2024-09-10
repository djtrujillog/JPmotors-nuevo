const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(new NodePolyfillPlugin());
    config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
    };
    return config;
};
