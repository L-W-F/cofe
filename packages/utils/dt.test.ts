import { dt } from './dt';

describe('dt', () => {
  test('0', () => {
    const tz = new Date(0).getTimezoneOffset();

    expect(dt(0 + tz * 60000).format('YYYY-MM-DD HH:mm:ss')).toBe(
      '1970-01-01 00:00:00',
    );
  });
});
