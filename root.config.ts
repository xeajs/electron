/// <reference types="node" />
/// <reference path="./typings/root.config.d.ts" />
import path from 'path';

export const RootOptions: RootOptions = {
  port: {
    views: 9001,
    serve: 9000
  }
};

export const webpackOptions = {
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
    port: RootOptions.port.views,
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
export default RootOptions;
