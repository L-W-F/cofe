import { b58e } from './b58e';

export const makeId = (prefix: string = '_') =>
  `${prefix}${b58e(+Date.now().toString().split('').reverse().join(''))}`;
