declare module 'http' {
  interface IncomingMessage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
  }
}

declare module '*.css';
declare module '*.png';
declare module '*.ico';
declare module '*.js';
declare module '*.json';

declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.less' {
  const content: any;
  export default content;
}
