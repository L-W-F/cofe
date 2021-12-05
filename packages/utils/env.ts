/* eslint-disable no-inline-comments */
export const isMac: boolean =
  typeof navigator !== 'undefined'
    ? navigator.userAgent.indexOf('Macintosh') !== -1
    : /* istanbul ignore next */ false;

export const isMobile: boolean =
  typeof navigator !== 'undefined'
    ? navigator.userAgent.indexOf('Mobi') !== -1
    : /* istanbul ignore next */ false;
