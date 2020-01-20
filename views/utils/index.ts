export { initApp } from './initApp';
export { getOs } from './getOs';
export { registerHotKey, unregisterHotKey } from './hotKey';

export const getMatchPath = () => {
  return window.location.hash.replace(/^\#/, '');
};
