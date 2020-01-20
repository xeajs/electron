/**
 * 插件文件默认放置在跟目录下 ~/public/plugins/node/
 * 打包的时候会自动复制到dist目录下
 * 通过方法导入，确保开发环境和线上环境地址保持一致
 */
import { remote } from 'electron';
export default (fileName): any => {
  return remote.require(`${process.cwd}/dist/public/plugins/node/${fileName}`);
};
