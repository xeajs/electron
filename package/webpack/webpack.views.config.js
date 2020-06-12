const path = require('path');
const utils = require('./webpack.views.utils');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
  const isPro = process.env.NODE_ENV === 'production';
  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? 'none' : 'cheap-module-source-map',
    target: 'electron-renderer',
    node: {
      __filename: false,
      __dirname: false,
      global: true,
      process: true
    },
    entry: {
      index: [options.entry.views]
    },
    output: {
      path: options.output.views,
      publicPath: options.publicPath.views,
      filename: isPro ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].js'
    },
    module: {
      rules: utils(isPro).modules
    },
    plugins: utils(isPro).plugins,
    externals: [
      {
        fs: 'require("fs")',
        os: 'require("os")',
        net: 'require("net")',
        path: 'require("path")',
        http: 'require("http")',
        child_process: 'require("child_process")'
      },
      /public\/library\/.+$/
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '~': path.join(process.cwd()),
        '@views': path.join(process.cwd(), 'views'),
        '@serve': path.join(process.cwd(), 'serve')
      }
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
    },
    optimization: {
      minimize: isPro,
      noEmitOnErrors: isPro,
      usedExports: true,
      runtimeChunk: {
        name: 'runtime'
      },
      minimizer: [
        new TerserPlugin({
          /** 多进程 进程数 */
          parallel: true,
          /** sourceMap */
          sourceMap: false,
          /**
           * 提取资源文件的注释和描述和 license。如下
           *  @license React v16.13.1
           * react-is.production.min.js
           *
           * Copyright (c) Facebook, Inc. and its affiliates.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           * */
          extractComments: false
        })
      ],
      splitChunks: {
        chunks: 'all', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 1, // 模块被引用>=1次，便分割
        name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        automaticNameDelimiter: '~', // 命名分隔符
        cacheGroups: {
          default: {
            // 模块缓存规则，设置为false，默认缓存组将禁用
            minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
            priority: -20, // 优先级
            reuseExistingChunk: true // 默认使用已有的模块
          },
          vendor: {
            // 抽离第三方插件
            test: /node_modules/, // 指定是node_modules下的第三方包
            chunks: 'initial',
            name: 'vendor', // 打包后的文件名，任意命名
            priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          },
          utils: {
            // 抽离自定义公共代码
            chunks: 'initial',
            name: 'public',
            minSize: 0 // 只要超出0字节就生成一个新包
          }
        }
      }
    }
  };
};
