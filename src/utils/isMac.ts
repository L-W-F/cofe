export const isMac: boolean =
  typeof navigator !== 'undefined'
    ? navigator.userAgent.indexOf('Macintosh') !== -1
    : false;
