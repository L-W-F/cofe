import { Schema } from './Schema';

describe('Schema', () => {
  test('#isAtom', () => {
    expect(Schema.isAtom({ type: 'foo' })).toBeTruthy();
    expect(Schema.isAtom({ type: 'bar' })).toBeTruthy();
    expect(Schema.isAtom({ type: 'foo:bar' })).toBeFalsy();
  });

  test('#isMolecule', () => {
    expect(Schema.isMolecule({ type: 'foo' })).toBeFalsy();
    expect(Schema.isMolecule({ type: 'molecule:foo' })).toBeTruthy();
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
