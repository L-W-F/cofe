import { b58e } from './b58e';

let seed = 0;

export const makeId = (prefix: string = '_') =>
  `${prefix}${b58e(
    +(Date.now() + ++seed).toString().split('').reverse().join(''),
  )}`;
