import { extractDefaults } from './extractDefaults';

describe('extractDefaults', () => {
  test('undefined', () => {
    expect(extractDefaults()).toBeUndefined();
  });

  test('empty', () => {
    expect(extractDefaults({})).toBeUndefined();
  });

  test('w/ default', () => {
    const schema = { type: 'string', default: 'foo' };

    expect(extractDefaults(schema)).toBe('foo');

    const schema2 = {
      type: 'array',
      default: ['foo', { bar: 'baz' }],
    };

    expect(extractDefaults(schema2)).toEqual(['foo', { bar: 'baz' }]);
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

  test('type: object', () => {
    expect(
      extractDefaults({
        type: 'object',
        properties: { foo: { type: 'array', items: { type: 'string' } } },
      }),
    ).toEqual({ foo: [] });
  });
});
