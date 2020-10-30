const Core = require('../../core');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const config = require('../../../../config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: Core.isPro() ? false : 'cheap-module-source-map',
  target: 'electron-main',
  node: {
    __filename: false,
    __dirname: false,
    global: true,
    process: true
  },
  entry: {
    index: [Core.JoinCwd(config.entry.mainProcess)]
  },
  output: {
    path: Core.JoinCwd(config.output),
    publicPath: './',
    filename: 'mainProcess.js'
  },
  module: {
    rules: [
      config.eslint && {
        test: /\.(ts)$/,
        enforce: 'pre',
        include: [/(src\/Main|src\/Types|src\/Setting)/],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: false,
              cache: false,
              emitError: true,
              emitWarning: true,
              /** 对输出进行格式化 */
              formatter: require.resolve('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.(js|ts)$/,
        exclude: [/(src\/Render|node_modules)/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: true
                    }
                  }
                ],
                '@babel/preset-typescript'
              ]
            }
          }
        ]
      }
    ].filter(Boolean)
  },
  plugins: [
    /** webpack 进程遇到错误代码将不会退出 */
    new webpack.NoEmitOnErrorsPlugin(),
    /** 排除清理文件。不清理渲染进程文件 */
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['mainProcess.*'] }),
    new Webpackbar({ name: 'MainProcess Service' })
  ],
  optimization: { minimize: Core.isPro() },
  externals: [
    {
      fs: 'require("fs")',
      os: 'require("os")',
      net: 'require("net")',
      path: 'require("path")',
      http: 'require("http")',
      crypto: 'require("crypto")',
      child_process: 'require("child_process")'
    },
    /public\/.+$/
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: config.alias
  }
};
