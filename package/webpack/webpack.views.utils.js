const path = require('path');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const plugins = (isPro) => {
  const plugin = [
    /** webpack 进程遇到错误代码将不会退出 */
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new Webpackbar({ name: 'React Service' }),
    new ErrorOverlayWebpackPlugin(),
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
  ];
  if (isPro) {
    return plugin.concat([
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:8].css'
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true //是否将插件信息打印到控制台
      })
    ]);
  } else {
    return plugin.concat([new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin({ forceEnable: true })]);
  }
};
const modules = (isPro) => {
  const presets_env = '@babel/preset-env';
  const presets_ts = '@babel/preset-typescript';
  const presets_react = '@babel/preset-react';
  /** ====== */
  const plugins_decorators = ['@babel/plugin-proposal-decorators', { legacy: true }];
  const plugins_properties = ['@babel/plugin-proposal-class-properties', { loose: true }];
  const plugins_spread = ['@babel/plugin-proposal-object-rest-spread'];
  const plugins_import = ['@babel/plugin-syntax-dynamic-import'];
  const plugins_styled_jsx = ['styled-jsx/babel'];
  const plugins_react_hot = isPro ? null : ['react-refresh/babel'];
  /**
   * @libraryDirectory
   * es export es规范导出；
   * lib exports commonjs规范导出；
   * default lib；
   * @style
   * true less；
   * css  css；
   */
  const plugins_antd = ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }];
  return [
    {
      test: /\.(jsx|tsx|js|ts)$/,
      exclude: [/serve/, /node_modules/],
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
              /** presets */
              presets_env,
              presets_ts,
              presets_react
            ].filter(Boolean),
            plugins: [
              /** plugins */
              plugins_decorators,
              plugins_properties,
              plugins_spread,
              plugins_import,
              plugins_styled_jsx,
              plugins_antd,
              plugins_react_hot
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
          loader: 'cache-loader'
        },
        {
          loader: 'thread-loader'
        },
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
      test: /\.jpe?g|png|gif|svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'cache-loader'
        },
        {
          loader: 'thread-loader'
        },
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
      test: /\.(less|css)$/,
      include: [/node_modules/, /assets/],
      /** 打包处理css样式表的第三方loader */
      use: [
        {
          loader: 'cache-loader'
        },
        {
          loader: 'style-loader'
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
      exclude: [/node_modules/, /assets/],
      use: [
        isPro
          ? MiniCssExtractPlugin.loader
          : {
              loader: 'style-loader' // creates style nodes from JS strings
            },
        {
          loader: 'css-loader',
          options: {
            url: true,
            import: true,
            sourceMap: !isPro,
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
    }
  ];
};

module.exports = (isPro) => {
  return {
    plugins: plugins(isPro),
    modules: modules(isPro)
  };
};
