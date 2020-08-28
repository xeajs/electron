declare module 'http' {
  interface IncomingMessage {
    body: unknown;
  }
}

declare module '*.css';
declare module '*.png';
declare module '*.ico';
declare module '*.js';
declare module '*.json';

declare module '*.svg' {
  const content: unknown;
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
