import Config from '~/config';
export { Send } from './Send';
export { Listen } from './Listen';

/**
 * @param path restfull api path
 * @eg /hello  ==>
 */
export const SetApiPrefix = (path: string) => {
  path = path || '';
  if (/^\//.test(path)) return Config.prefix + path;
  return Config.prefix + '/' + path;
};
