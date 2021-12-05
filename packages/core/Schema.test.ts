import { Schema } from './Schema';

describe('Schema', () => {
  test('#has/add/get/del', () => {
    expect(Schema.has('foo')).toBeFalsy();
    expect(Schema.get('foo')).toBeUndefined();
    Schema.add({ type: 'foo' });
    expect(Schema.has('foo')).toBeTruthy();
    expect(Schema.get('foo')).toEqual({ type: 'foo' });
    Schema.add({ type: 'foo', accept: ['bar'] });
    expect(Schema.get('foo')).toEqual({ type: 'foo', accept: ['bar'] });
    Schema.del('foo');
    expect(Schema.has('foo')).toBeFalsy();
  });

  test('#add arbitrary', () => {
    Schema.add({ type: 'arbitrary:foo' });
    expect(Schema.get('arbitrary:foo')).toEqual({
      type: 'arbitrary:foo',
    });
    Schema.del('arbitrary:foo');
  });

  test('#add mixin', () => {
    Schema.add({ type: 'mixin:foo', accept: ['bar'] });
    Schema.add({ type: 'foo', extends: ['mixin:foo'] });
    expect(Schema.get('foo')).toEqual({
      type: 'foo',
      extends: ['mixin:foo'],
      accept: ['bar'],
    });
    Schema.del('mixin:foo');
    Schema.del('foo');
  });

  test('#add template', () => {
    Schema.add({
      type: 'template:foo',
      template: { type: 'foo', accept: ['bar'] },
    });
    expect(Schema.get('template:foo')).toEqual({
      type: 'template:foo',
      template: { type: 'foo', accept: ['bar'] },
    });
    Schema.del('template:foo');
  });

  test('#getAtomKeys', () => {
    expect(Schema.getAtomKeys()).toEqual([]);
  });

  test('#getTemplateKeys', () => {
    expect(Schema.getTemplateKeys()).toEqual([]);
  });

  test('#isAtom', () => {
    expect(Schema.isAtom({ type: 'foo' })).toBeTruthy();
    expect(Schema.isAtom({ type: 'bar' })).toBeTruthy();
    expect(Schema.isAtom({ type: 'foo:bar' })).toBeFalsy();
  });

  test('#isMixin', () => {
    expect(Schema.isMixin({ type: 'foo' })).toBeFalsy();
    expect(Schema.isMixin({ type: 'mixin:foo' })).toBeTruthy();
  });

  test('#isTemplate', () => {
    expect(Schema.isTemplate({ type: 'foo' })).toBeFalsy();
    expect(Schema.isTemplate({ type: 'template:foo' })).toBeTruthy();
  });

  test('#isAccepted', () => {
    expect(Schema.isAccepted(undefined, 'foo')).toBeFalsy();
    expect(Schema.isAccepted([], 'foo')).toBeFalsy();
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
