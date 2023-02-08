import path from 'node:path';

export default {
  /** 主进程服务端口, 开发环境渲染进程端口 = +1 */
  PORT: 10150,
  ENTRY: path.resolve(__dirname, 'src/main/index.ts'),
  HOT_UPDATER: 'http://118.24.173.102:10150',
  OUTDIR: 'dist'
};
