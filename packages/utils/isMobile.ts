export const isMobile: boolean =
  typeof navigator !== 'undefined'
    ? navigator.userAgent.indexOf('Mobi') !== -1
    : false;
