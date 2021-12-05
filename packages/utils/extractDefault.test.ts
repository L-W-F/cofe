import { extractDefaults } from './extractDefaults';

describe('extractDefaults', () => {
  test('empty: undefined', () => {
    expect(extractDefaults()).toBeUndefined();
  });

  test('empty: object', () => {
    expect(extractDefaults({})).toBeUndefined();
  });

  test('default: simple', () => {
    expect(extractDefaults({ type: 'string', default: 'foo' })).toBe('foo');
  });

  test('default: complex', () => {
    expect(
      extractDefaults({
        type: 'array',
        default: ['foo', { bar: 'baz' }],
      }),
    ).toEqual(['foo', { bar: 'baz' }]);
  });

  test('type: string', () => {
    expect(extractDefaults({ type: 'string' })).toBe('');
  });

  test('type: number', () => {
    expect(extractDefaults({ type: 'number' })).toBe(0);
  });

  test('type: boolean', () => {
    expect(extractDefaults({ type: 'boolean' })).toBe(false);
  });

  test('type: array', () => {
    expect(extractDefaults({ type: 'array' })).toEqual([]);
  });

  test('type: object #1', () => {
    expect(
      extractDefaults({
        type: 'object',
        properties: {
          foo: {
            type: 'string',
          },
          bar: {
            type: 'string',
          },
        },
      }),
    ).toEqual({ foo: '', bar: '' });
  });

  test('type: object #2', () => {
    expect(
      extractDefaults({
        type: 'object',
        properties: { foo: { type: 'array', items: { type: 'string' } } },
      }),
    ).toEqual({ foo: [] });
  });

  test('type: object #3', () => {
    expect(
      extractDefaults({
        type: 'object',
        properties: { foo: { type: 'unknown' } },
      }),
    ).toEqual({});
  });
});
