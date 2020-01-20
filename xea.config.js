const path = require('path');
exports.XeaCliNodeService = ({ rootPath, env }) => {
  const root = process.cwd();
  return {
    /** tsconfig.json 文件目录 */
    tsConfigFile: path.join(root, 'tsconfig.serve.json'),
    /** 工作目录 */
    appSrc: path.join(root, 'serve'),
    /** 入口文件 */
    appIndex: path.join(root, 'serve/index.ts'),
    /** 打包输出到目录 */
    appBuild: path.join(root, 'dist/serve'),
    /** 是否把 node_modules 内的文件一起打包 */
    buildNodeModules: false,
    /** 生产环境是否启用 sourceMap */
    sourceMap: false,
    /** 开发环境是否使用 nodemon 自动启动服务 */
    nodemon: false
  };
};

exports.XeaCliViewService = ({ rootPath, env }) => {
  const root = process.cwd();
  return {
    target: 'electron-renderer',
    /** tsconfig.json 文件目录 */
    tsConfigFile: path.join(root, 'tsconfig.views.json'),
    /** 工作目录 */
    appSrc: path.join(root, 'views'),
    /** 入口文件 */
    appIndex: path.join(root, 'views/index.tsx'),
    /** 打包输出到目录 */
    appBuild: path.join(root, 'dist/views'),
    /** 是否把 node_modules 内的文件一起打包 */
    sourceMap: true,
    /** dev-serve 开发环境 */
    devServer: {
      port: 9001,
      host: '127.0.0.1',
      open: false
    },
    externals: {
      electron: 'global.require("electron")'
    },
    node: {
      port: 9000
    }
  };
};
