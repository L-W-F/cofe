import { Schema } from './Schema';

describe('Schema', () => {
  test('#isTemplate', () => {
    expect(Schema.isTemplate({ type: 'foo' })).toBeFalsy();
    expect(
      Schema.isTemplate({ type: 'template:temp', template: { type: 'foo' } }),
    ).toBeTruthy();
  });

  test('#isAccepted', () => {
    expect(Schema.isAccepted(['foo'], 'foo')).toBeTruthy();
    expect(Schema.isAccepted(['!foo'], 'foo')).toBeFalsy();
    expect(Schema.isAccepted(['bar'], 'foo')).toBeFalsy();
    expect(Schema.isAccepted(['!bar'], 'foo')).toBeTruthy();
    expect(Schema.isAccepted(['*'], 'foo')).toBeTruthy();
    expect(Schema.isAccepted(['foo', 'bar'], 'foo')).toBeTruthy();
    expect(Schema.isAccepted(['foo', 'bar'], 'bar')).toBeTruthy();
    expect(Schema.isAccepted(['foo', 'bar'], 'baz')).toBeFalsy();
  });
});
