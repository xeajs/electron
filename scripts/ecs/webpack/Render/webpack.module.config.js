const Core = require('../../core');
const config = require('../../../../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      config.eslint && {
        test: /\.(tsx|ts)$/,
        enforce: 'pre',
        include: /Render/,
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
        exclude: [/(src\/Main|node_modules)/],
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              presets: [
                /** presets */
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: [
                /** plugins */
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-object-rest-spread'],
                ['@babel/plugin-syntax-dynamic-import'],
                ['styled-jsx/babel'],
                ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
                Core.isPro() ? null : ['react-refresh/babel']
              ].filter(Boolean)
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //配置公共资源路径
              publicPath: '/assets/font',
              //配置输出路径
              outputPath: 'assets/font',
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.jpe?g|png|gif|svg|ico$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20 * 1024, // 20k
              //配置公共资源路径
              publicPath: '/assets/img',
              //配置输出路径
              outputPath: 'assets/img',
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(less)$/,
        include: [/node_modules/],
        /** 打包处理css样式表的第三方loader */
        use: [
          (Core.isPro() && MiniCssExtractPlugin.loader) || {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(less)$/,
        exclude: [/node_modules/],
        use: [
          (Core.isPro() && MiniCssExtractPlugin.loader) || {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              sourceMap: !Core.isPro(),
              esModule: true,
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportGlobals: true,
                hashPrefix: 'hash',
                localIdentName: '[name]-[hash:8]'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        include: [/assets/],
        use: [
          (Core.isPro() && MiniCssExtractPlugin.loader) || {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-comment',
                plugins: [
                  /** */
                  ['precss'],
                  /** 压缩 */
                  Core.isPro() && ['cssnano'],
                  ['cssnext'],
                  ['postcss-flexbugs-fixes']
                ].filter(Boolean)
              }
            }
          }
        ]
      }
    ].filter(Boolean)
  }
};
