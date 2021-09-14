const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const radix = chars.length;

export const b58e = (num: number) => {
  let str = '';

  while (num >= radix) {
    const remainder = num % radix;

    str = `${chars.charAt(remainder)}${str}`;
    num = (num - remainder) / radix;
  }

  return `${chars.charAt(num)}${str}`;
};
