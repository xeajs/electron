const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const XeaCompiledNote = require('../plugins/xea-compiled-note');
const nodeExternals = require('webpack-node-externals');

module.exports = (options) => {
  const isPro = process.env.NODE_ENV === 'production';
  const _entry_ = () => {
    return {
      index: [options.entry.serve]
    };
  };
  const _output_ = () => {
    return {
      path: options.output.serve,
      publicPath: options.publicPath.serve,
      filename: 'index.js'
    };
  };
  const _plugins_ = () => {
    const base = [
      // new webpack.NormalModuleReplacementPlugin(/^any-promise$/),
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(),
      new Webpackbar({ name: 'Node Service' })
    ];
    const pro = [];
    const dev = [
      // new XeaCompiledNote({ port: options.devServer.port, name: 'Node Service', clearConsole: false })
    ];
    return isPro ? pro.concat(base) : dev.concat(base);
  };
  const _devServer_ = () => {
    if (isPro) return {};
    return options.devServer;
  };
  const _module_ = () => {
    return {
      rules: [
        {
          test: /\.(ts)$/,
          enforce: 'pre',
          exclude: [/node_modules/, /views/, /dist/],
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
          exclude: /views/,
          use: [
            // {
            //   loader: 'thread-loader'
            // },
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env'], '@babel/preset-typescript'],
                plugins: [
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  [
                    '@babel/plugin-proposal-class-properties',
                    {
                      loose: true
                    }
                  ],
                  ['@babel/plugin-proposal-object-rest-spread'],
                  ['@babel/plugin-syntax-dynamic-import']
                ]
              }
            }
          ]
        }
      ]
    };
  };
  const _optimization_ = () => {
    if (!isPro) return {};
    return {};
  };
  const _externals_ = () => {
    return [
      nodeExternals(),
      /public\/library\/.+$/,
      {
        fs: 'require("fs")',
        os: 'require("os")',
        net: 'require("net")',
        path: 'require("path")',
        child_process: 'require("child_process")'
      }
    ];
  };
  const _resolve_ = () => {
    return {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '~': path.join(process.cwd()),
        '@serve': path.join(process.cwd(), 'serve')
      }
    };
  };
  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? 'none' : 'cheap-module-source-map',
    target: 'electron-main',
    node: {
      __filename: false,
      __dirname: false
    },
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
