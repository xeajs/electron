const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * 前端 && 后端 && 开发环境 && 生产环境
 * @babel
 * @eslint
 */
const baseModule = (isViews) => {
  const presets_env = '@babel/preset-env';
  const presets_ts = '@babel/preset-typescript';
  const presets_react = '@babel/preset-react';
  /** ====== */
  const plugins_decorators = ['@babel/plugin-proposal-decorators', { legacy: true }];
  const plugins_properties = ['@babel/plugin-proposal-class-properties', { loose: true }];
  const plugins_spread = ['@babel/plugin-proposal-object-rest-spread'];
  const plugins_import = ['@babel/plugin-syntax-dynamic-import'];
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
      test: /\.(ts|tsx)$/,
      enforce: 'pre',
      exclude: [/node_modules/, /dist/, /output/],
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
      exclude: [],
      use: [
        {
          loader: 'thread-loader'
        },
        {
          loader: 'babel-loader',
          options: {
            compact: false,
            presets: [presets_env, presets_ts, isViews ? presets_react : null].filter((d) => d),
            plugins: [plugins_decorators, plugins_properties, plugins_spread, plugins_import, isViews ? plugins_antd : null].filter((d) => d)
          }
        }
      ]
    }
  ];
};
const serveModule = () => {
  return baseModule(false);
};
/**
 * @url-loader
 * @file-loader
 * @css-loader
 * @style-loader
 * @postcss-loader
 */
const viewsModule = (isPro) => {
  return baseModule(true).concat([
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      exclude: /node_modules/,
      use: [
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
  ]);
};

module.exports = (isPro) => {
  return {
    serve: {
      rules: serveModule()
    },
    views: {
      rules: viewsModule(isPro)
    }
  };
};
