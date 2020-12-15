declare module '*.css';
declare module '*.png';
declare module '*.ico';
declare module '*.js';
declare module '*.json';
declare module '*.node';

declare module '*.svg';
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
