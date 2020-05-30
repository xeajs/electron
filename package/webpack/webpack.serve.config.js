const core = require('./core');
const modules = require('./modules');
const plugins = require('./plugins');

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
    module: modules(isPro).serve,
    plugins: plugins(isPro).serve,
    optimization: {},
    externals: core.externals('serve'),
    resolve: core.resolve('serve')
  };
};
