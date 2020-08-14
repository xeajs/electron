const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('../../../config');
const Utils = require('../../core/utils');

const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isPro ? 'production' : 'development',
  devtool: isPro ? 'none' : 'cheap-module-source-map',
  target: 'electron-main',
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    index: [Utils.JoinCwd(config.entry.serve)]
  },
  output: {
    path: Utils.JoinCwd(config.output.serve),
    publicPath: './',
    filename: 'index.js'
  },
  module: {
    rules: [
      config.eslint && {
        test: /\.(ts)$/,
        enforce: 'pre',
        include: [/serve/, /global/],
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
        test: /\.(jsx|tsx|js|ts)$/,
        exclude: [/views/, /dist/, /package/],
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
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
    new CleanWebpackPlugin(),
    new Webpackbar({ name: 'Node Service' })
  ],
  // optimization: {},
  externals: isPro
    ? [
        {
          fs: 'require("fs")',
          os: 'require("os")',
          net: 'require("net")',
          path: 'require("path")',
          http: 'require("http")',
          child_process: 'require("child_process")'
        },
        /public\/library\/.+$/
      ]
    : nodeExternals(),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '~': Utils.JoinCwd(),
      '@views': Utils.JoinCwd('views'),
      '@serve': Utils.JoinCwd('serve')
    }
  }
};
