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
    Core.isPro() ? new MiniCssExtractPlugin({ filename: 'assets/css/[name].[hash:8].css' }) : null,
    Core.isPro()
      ? new OptimizeCSSAssetsPlugin({
          /** 使用 cssnano 压缩 */
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            /** 删除注释 */
            discardComments: { removeAll: true }
          },
          /** 是否将插件信息打印到控制台 */
          canPrint: false
        })
      : null,
    Core.isPro() ? null : new webpack.NamedModulesPlugin(),
    Core.isPro() ? null : new webpack.HotModuleReplacementPlugin(),
    Core.isPro() ? null : new ReactRefreshWebpackPlugin({ forceEnable: true })
  ].filter(Boolean)
};
