module.exports = {
  /** 开发运行时 runtime */
  nodemon: true,
  /** 开发运行时 runtime */
  eslint: false,
  /** 开发运行时 runtime */
  tslint: true,
  /** 主进程端口，开发环境渲染进程端口号 +=1 */
  port: 10150,
  entry: {
    views: 'views/index.tsx',
    serve: 'serve/index.ts'
  },
  output: {
    views: 'dist/views',
    serve: 'dist/serve'
  },
  viewsPublicPath: '/',
  viewsAssetsDir: 'dist/views/assets',
  devServer: {
    after() {},
    before() {}
  }
};
