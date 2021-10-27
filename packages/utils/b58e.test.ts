import { b58e } from './b58e';

describe('b58e', () => {
  test('encode number to string', () => {
    expect(b58e(0)).toBe('1');
    expect(b58e(1)).toBe('2');
    expect(b58e(2)).toBe('3');
    expect(b58e(3)).toBe('4');
    expect(b58e(100)).toBe('2j');
    expect(b58e(1000)).toBe('JF');
    expect(b58e(10000)).toBe('3yR');
    expect(b58e(100000)).toBe('Wj9');
    expect(b58e(1000000)).toBe('68GP');
    expect(b58e(10000000)).toBe('tFeo');
    expect(b58e(100000000)).toBe('9qXWw');
    expect(b58e(Number.MAX_SAFE_INTEGER)).toBe('2DLNrMSKug');
    expect(b58e(Number.MAX_VALUE)).toBe(
      'TCQK6EStMM5f3hyVZjydbb9PFVjBuDHwX9j1q1BH3VHwFZXshKZmRPDPXDTMMVPwZyRwMohhwyFB7HyRsPy97H53yRVyfThToDXwmdBFsBf3VoyuZjwuyw7VqfB3dwTjR9w3fyZT5ZquZX9Z9oomFqXVXbFbXFBuKbFV7mbo5FH7jwV',
    );
  });
});
