const path = require('path');
const PackageJson = require('./package.json');

module.exports = {
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

  alias: {
    '~': process.cwd(),
    '@': path.join(process.cwd(), 'src')
  },

  output: 'dist',

  publicPath: '/',

  devServer: {
    after() {},
    before() {}
  },

  /** 主进程服务接口前缀 */
  prefix: '/apis',

  hotUpdater: 'http://118.24.173.102:10150',
  /** 内置功能启用和配置 */
  plugins: {
    /** 公共存储二级目录 @必须 */
    diskPath: path.join('.xeajs', PackageJson.productName || 'electron'),
    logs: {
      /** 日志保留天数 */
      retainDate: 7
    },
    db: {
      /** @注意 仅支持项目初始化没有数据时修改，数据库已经有数据则不可变更 */
      crypto: true
    }
  }
};
