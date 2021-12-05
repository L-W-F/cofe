import { isMac, isMobile } from './env';

describe('env', () => {
  test('isMac', () => {
    // navigator.userAgent:
    // Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0
    expect(isMac).toBeFalsy();
  });

  test('isMobile', () => {
    // navigator.userAgent:
    // Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0
    expect(isMobile).toBeFalsy();
  });
});
