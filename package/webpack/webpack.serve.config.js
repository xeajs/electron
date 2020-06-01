const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (options) => {
  const isPro = process.env.NODE_ENV === 'production';
  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? 'none' : 'cheap-module-source-map',
    target: 'electron-main',
    node: {
      __filename: false,
      __dirname: false
    },
    entry: {
      index: [options.entry.serve]
    },
    output: {
      path: options.output.serve,
      publicPath: options.publicPath.serve,
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          exclude: [/views/, /dist/, /package/],
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
      ]
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
        '~': path.join(process.cwd()),
        '@views': path.join(process.cwd(), 'views'),
        '@serve': path.join(process.cwd(), 'serve')
      }
    }
  };
};
