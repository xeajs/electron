const path = require('path');
module.exports = {
  entry: {
    views: path.join(process.cwd(), 'views/index.tsx'),
    serve: path.join(process.cwd(), 'serve/index.ts')
  },
  output: {
    views: path.join(process.cwd(), 'dist/views'),
    serve: path.join(process.cwd(), 'dist/serve')
  },
  publicPath: {
    views: '/',
    serve: '/'
  },
  assetsDir: {
    views: 'assets',
    serve: null
  },
  devServer: {
    port: 9090,
    hot: true,
    open: false,
    hotOnly: false,
    noInfo: true,
    injectClient: true,
    injectHot: true,
    after() {},
    before() {},
    stats: 'errors-only',
    disableHostCheck: true,
    clientLogLevel: 'error'
  }
};
