const path = require('path');

const JoinCwd = (...args) => {
  if (!args.length) {
    return process.cwd();
  }
  return path.join(process.cwd(), ...args);
};

module.exports = {
  /** 公共存储二级目录 */
  diskPath: path.join('.xeajs', 'electron'),
  /** 开发运行时 runtime */
  nodemon: true,

  /** 开发运行时 runtime */
  eslint: false,

  /** 开发运行时 runtime */
  tslint: true,

  /** speed-measure-webpack-plugin */
  smp: false,

  /** 主进程端口，开发环境渲染进程端口号 +=1 */
  port: 10150,

  entry: {
    renderProcess: 'src/Render/index.tsx',
    mainProcess: 'src/Main/index.ts'
  },

  /** antd 主题定制，基于 less modifyVars */
  antdTheme: {},

  alias: {
    '~': JoinCwd(),
    '@': JoinCwd('src')
  },

  /** 日志保留天数 */
  logRetainDate: 7,

  output: 'dist',

  publicPath: '/',

  devServer: {
    after() {},
    before() {}
  },
  prefix: '/apis',
  hotUpdaterUri: 'http://118.24.173.102:10150'
};
