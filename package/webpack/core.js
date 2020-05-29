/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = class {
  static babel(type) {
    if (!['views', 'serve'].includes(type)) {
      throw new Error('参数不合法');
    }
    let presets = ['@babel/preset-env', '@babel/preset-typescript'];
    let plugins = [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      ['@babel/plugin-proposal-object-rest-spread'],
      ['@babel/plugin-syntax-dynamic-import']
    ];
    let exclude = [];
    switch (type) {
      case 'views':
        presets.push('@babel/preset-react');
        plugins.push([
          require.resolve('babel-plugin-import'),
          {
            libraryName: 'antd',
            /**
             *  es export es规范导出；
             * lib exports commonjs规范导出；
             * default lib；
             */
            libraryDirectory: 'es',
            /**
             * true less
             * css  css
             */
            style: 'css'
          }
        ]);
        exclude = [/serve/];
        break;
      case 'serve':
        exclude = [/views/];
        break;
    }
    return {
      test: /\.(jsx|tsx|js|ts)$/,
      exclude,
      use: [
        {
          loader: 'thread-loader'
        },
        {
          loader: 'babel-loader',
          options: {
            compact: false,
            presets,
            plugins
          }
        }
      ]
    };
  }
  static eslint(type) {
    if (!['views', 'serve'].includes(type)) return {};
    let exclude = [/node_modules/, /dist/];
    switch (type) {
      case 'views':
        exclude.push(/serve/);
        break;
      case 'serve':
        exclude.push(/views/);
        break;
    }
    return {
      test: /\.(ts)$/,
      enforce: 'pre',
      exclude,
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
    };
  }
  static resolve(type) {
    if (!['views', 'serve'].includes(type)) return {};
    let pro = {
      extensions: [],
      alias: {}
    };
    switch (type) {
      case 'views':
        pro.extensions = ['.tsx', '.ts', '.js', '.json'];
        pro.alias = {
          '~': path.join(process.cwd()),
          '@views': path.join(process.cwd(), 'views')
        };
        break;
      case 'serve':
        pro.extensions = ['.ts', '.json'];
        pro.alias = {
          '~': path.join(process.cwd()),
          '@serve': path.join(process.cwd(), 'serve')
        };
        break;
    }
    return pro;
  }
  static externals(type) {
    if (!['views', 'serve'].includes(type)) {
      throw new Error('参数不合法');
    }
    let pro = [
      {
        fs: 'require("fs")',
        os: 'require("os")',
        net: 'require("net")',
        path: 'require("path")',
        child_process: 'require("child_process")'
      },
      /public\/library\/.+$/
    ];
    switch (type) {
      case 'views':
        break;
      case 'serve':
        pro.push(nodeExternals());
        break;
    }
    return pro;
  }
  static plugins(type, isPro) {
    if (!['views', 'serve'].includes(type)) return {};
    let pro = [new webpack.NoEmitOnErrorsPlugin(), new CleanWebpackPlugin()];
    switch (type) {
      case 'views':
        pro.push(new Webpackbar({ name: 'React Service' }));
        pro.push(
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
        );
        if (isPro) {
        } else {
        }
        break;
      case 'serve':
        pro.push(new Webpackbar({ name: 'Node Service' }));
        break;
    }
    return pro;
  }
};
