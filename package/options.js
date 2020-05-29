const path = require('path');

require('ts-node').register({
  project: path.join(process.cwd(), 'tsconfig.json')
});

const { webpackOptions } = require(path.join(process.cwd(), 'root.config'));

module.exports = webpackOptions;
