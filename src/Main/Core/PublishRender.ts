/**
 * @Author yejiang1015
 * @Date 2021-01-04 16:45:23
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:46:43
 * @Message 静态资源服务，部署生产环境下的渲染进程资源
 */

import Koa from 'koa';
import serveStatic from 'koa-static';

export const PublishRender = (app: Koa) => {
  /**
   * @Message 部署软件窗口代码
   * @Eg <script src="/assets/js/xxx.hash[8].js" />
   */
  app.use(serveStatic(__dirname));
  /**
   * @Message 与webpack devServer 部署的静态资源目录保持一致
   * @Message 确保开发环境和生产环境使用的地址是一致的
   * @Eg <img src="/public/assets/favicon/png/favicon.png" alt="测试图片" />
   */
  app.use(serveStatic($$.joinPathBasedOnThePublic('../')));
};
