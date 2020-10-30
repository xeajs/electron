const path = require('path');

const JoinCwd = (...args) => {
  if (!args.length) {
    return process.cwd();
  }
  return path.join(process.cwd(), ...args);
};

module.exports = {
  /** 公共存储二级目录 */
  diskPath: path.join('.xeajs', 'xeajs pro'),
  /** 开发运行时 runtime */
  nodemon: true,

  /** 开发运行时 runtime */
  eslint: true,

  /** 开发运行时 runtime */
  tslint: true,

  /** 主进程端口，开发环境渲染进程端口号 +=1 */
  port: 10150,

  entry: {
    renderProcess: 'src/Render/index.tsx',
    mainProcess: 'src/Main/index.ts'
  },

  alias: {
    '~': JoinCwd(),
    '@': JoinCwd('src')
  },

  /** 日志保留天数 */
  logRetainDate: 7,

  output: 'dist',

  viewsPublicPath: '/',

  devServer: {
    after() {},
    before() {}
  },
  prefix: '/apis',
  hotUpdaterUri: 'http://118.24.173.102:10150'
};
