const Core = require('../../core');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  plugins: [
    /** webpack 进程遇到错误代码将不会退出 */
    new webpack.NoEmitOnErrorsPlugin(),
    /** 排除清理文件。不清理主进程文件 */
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['assets', '*.html', 'public'] }),
    new Webpackbar({ name: 'RenderProcess Service' }),
    new ErrorOverlayWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Core.JoinCwd('public/index.html'),
      filename: 'index.html',
      title: 'React Servive',
      hash: Core.isPro(),
      minify: {
        removeComments: Core.isPro(),
        collapseWhitespace: Core.isPro(),
        removeRedundantAttributes: Core.isPro(),
        useShortDoctype: Core.isPro(),
        removeEmptyAttributes: Core.isPro(),
        removeStyleLinkTypeAttributes: Core.isPro(),
        keepClosingSlash: Core.isPro(),
        minifyJS: Core.isPro(),
        minifyCSS: Core.isPro(),
        minifyURLs: Core.isPro()
      },
      chunksSortMode: 'auto'
    }),
    Core.isPro() &&
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:8].css'
      }),
    Core.isPro() &&
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true //是否将插件信息打印到控制台
      }),
    !Core.isPro() && new webpack.NamedModulesPlugin(),
    !Core.isPro() && new webpack.HotModuleReplacementPlugin(),
    !Core.isPro() && new ReactRefreshWebpackPlugin({ forceEnable: true })
  ].filter(Boolean)
};
