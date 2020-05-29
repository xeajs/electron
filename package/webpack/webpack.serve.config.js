const core = require('./core');

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
      rules: [core.eslint('serve'), core.babel('serve')]
    },
    plugins: core.plugins('serve', isPro),
    optimization: {},
    externals: core.externals('serve'),
    resolve: core.resolve('serve')
  };
};
