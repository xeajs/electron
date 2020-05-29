const core = require('./core');

module.exports = (options) => {
  const isPro = process.env.NODE_ENV === 'production';
  return {
    mode: isPro ? 'production' : 'development',
    devtool: isPro ? 'none' : 'cheap-module-source-map',
    target: 'electron-renderer',
    node: {
      __filename: false,
      __dirname: false
    },
    entry: {
      index: [isPro ? null : 'webpack-dev-server/client', options.entry.views].filter((d) => d)
    },
    output: {
      path: options.output.views,
      publicPath: options.publicPath.views,
      filename: isPro ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].js'
    },
    module: {
      rules: [core.eslint('views'), core.babel('views')]
    },
    plugins: core.plugins('views', isPro),
    optimization: {},
    externals: core.externals('views'),
    resolve: core.resolve('views'),
    devServer: options.devServer
  };
};
