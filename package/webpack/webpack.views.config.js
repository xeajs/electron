const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpackbar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const XeaCompiledNote = require('../plugins/xea-compiled-note');

module.exports = (options) => {
  const isPro = process.env.NODE_ENV === 'production';
  const _entry_ = () => {
    return {
      index: [isPro ? null : 'webpack-dev-server/client', options.entry.views].filter((d) => d)
    };
  };
  const _output_ = () => {
    return {
      path: options.output.views,
      publicPath: options.publicPath.views,
      filename: isPro ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].js'
    };
  };
  const _plugins_ = () => {
    const base = [
      new CleanWebpackPlugin(),
      new Webpackbar({ name: 'React Service' }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../template/index.html'),
        filename: 'index.html',
        title: 'React Servive',
        hash: isPro,
        minify: {
          removeComments: isPro,
          collapseWhitespace: isPro,
          removeRedundantAttributes: isPro,
          useShortDoctype: isPro,
          removeEmptyAttributes: isPro,
          removeStyleLinkTypeAttributes: isPro,
          keepClosingSlash: isPro,
          minifyJS: isPro,
          minifyCSS: isPro,
          minifyURLs: isPro
        },
        chunksSortMode: 'auto'
      })
    ];
    const pro = [];
    const dev = [
      // new XeaCompiledNote({ port: options.devServer.port, name: 'React Service', clearConsole: false })
    ];
    return isPro ? pro.concat(base) : dev.concat(base);
  };
  const _devServer_ = () => {
    if (isPro) return {};
    return options.devServer;
  };
  const _module_ = () => {
    return {};
  };
  const _optimization_ = () => {
    if (!isPro) return {};
    return {};
  };
  const _externals_ = () => {
    return [
      /public\/library\/.+$/,
      {
        fs: 'global.require("fs")',
        os: 'global.require("os")',
        net: 'global.require("net")',
        path: 'global.require("path")',
        child_process: 'global.require("child_process")'
      }
    ];
  };
  const _resolve_ = () => {
    return {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '~': path.join(process.cwd()),
        '@views': path.join(process.cwd(), 'views')
      }
    };
  };

  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? 'none' : 'cheap-module-source-map',
    target: 'electron-renderer',
    entry: _entry_(),
    output: _output_(),
    module: _module_(),
    devServer: _devServer_(),
    plugins: _plugins_(),
    optimization: _optimization_(),
    externals: _externals_(),
    resolve: _resolve_()
  };
};
