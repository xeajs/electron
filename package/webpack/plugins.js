const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * 前端 && 后端 && 开发环境 && 生产环境
 */
const servePlugins = () => {
  return [
    /** webpack 进程遇到错误代码将不会退出 */
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new Webpackbar({ name: 'Node Service' })
  ];
};
const viewsPlugins = (isPro) => {
  let plugins = [
    /** webpack 进程遇到错误代码将不会退出 */
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new Webpackbar({ name: 'React Service' }),
    new ErrorOverlayWebpackPlugin(),
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

  if (isPro) {
    return [
      ...plugins,
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:8].css'
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true //是否将插件信息打印到控制台
      })
    ];
  } else {
    return [...plugins, new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()];
  }
};

module.exports = (isPro) => {
  return {
    serve: servePlugins(),
    views: viewsPlugins(isPro)
  };
};
