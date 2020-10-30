const Core = require('../../core');
const config = require('../../../../config');
const WebpackModuleConfig = require('./webpack.module.config');
const WebpackPluginsConfig = require('./webpack.plugins.config');
const WebpackTerserConfig = require('./webpack.terser.config');

module.exports = {
  plugins: WebpackPluginsConfig.plugins,
  module: WebpackModuleConfig.module,
  optimization: WebpackTerserConfig.optimization,
  mode: process.env.NODE_ENV,
  devtool: Core.isPro() ? false : 'cheap-module-source-map',
  target: 'electron-renderer',
  node: {
    __filename: false,
    __dirname: false,
    global: true
  },
  entry: {
    index: ['babel-polyfill', Core.JoinCwd(config.entry.renderProcess)]
  },
  output: {
    path: Core.JoinCwd(config.output),
    publicPath: config.publicPath || '/',
    filename: Core.isPro() ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].js'
  },
  externals: [
    {
      fs: 'require("fs")',
      os: 'require("os")',
      net: 'require("net")',
      path: 'require("path")',
      http: 'require("http")',
      child_process: 'require("child_process")'
    }
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: config.alias
  },
  performance: {
    hints: 'warning',
    /** 资源大小报警阈值 （以字节为单位） */
    maxAssetSize: 30000000,
    /** 入口文件大小报警阈值 （以字节为单位） */
    maxEntrypointSize: 50000000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
};
