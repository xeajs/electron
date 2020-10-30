const Core = require('../../core');
const TerserPlugin = require('terser-webpack-plugin');

const optimization = {
  minimize: true,
  noEmitOnErrors: true,
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
    /** 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块) */
    chunks: 'all',
    /** 模块超过30k自动被抽离成公共模块 */
    minSize: 30000,
    /** 模块被引用>=1次，便分割 */
    minChunks: 1,
    /** 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function */
    name: true,
    /** 命名分隔符 */
    automaticNameDelimiter: '~',
    cacheGroups: {
      default: {
        /** 模块缓存规则，设置为false，默认缓存组将禁用 模块被引用>=2次，拆分至vendors公共模块 */
        minChunks: 2,
        /** 优先级 */
        priority: -20,
        /** 默认使用已有的模块 */
        reuseExistingChunk: true
      },
      vendor: {
        /** 指定是node_modules下的第三方包 抽离第三方插件 */
        test: /node_modules/,
        /**  */
        chunks: 'initial',
        /** 打包后的文件名，任意命名 */
        name: 'vendor',
        /** 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包 */
        priority: 10
      },
      utils: {
        /** 抽离自定义公共代码 */
        chunks: 'initial',
        name: 'public',
        /** 只要超出0字节就生成一个新包 */
        minSize: 0
      }
    }
  }
};

module.exports = {
  optimization: Core.isPro() ? optimization : {}
};
