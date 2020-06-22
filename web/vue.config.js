const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.join(__dirname, './src/components'),
      },
    },
  },
};
