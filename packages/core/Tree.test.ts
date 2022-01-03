import { Tree } from './Tree';

describe('Tree', () => {
  test('#create', () => {
    const t1 = Tree.create({ type: 'foo' });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
  });

  test('#create w/ shorthand', () => {
    const t1 = Tree.create('foo');

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
  });

  test('#create w/ registered', () => {
    const t1 = Tree.create('icon');

    expect(t1).toHaveProperty('type', 'icon');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'width'], 24);
  });

  test('#create w/ molecule', () => {
    const t1 = Tree.create({
      type: 'molecule:foo',
      pattern: {
        type: 'foo',
        properties: {
          baz: 'bar',
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'baz'], 'bar');
  });

  test('#create w/ molecule w/properties', () => {
    const t1 = Tree.create({
      type: 'molecule:foo',
      pattern: {
        type: 'foo',
        properties: {
          baz: 'bar',
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'baz'], 'bar');
  });

  test('#create w/ molecule w/ children', () => {
    const t1 = Tree.create({
      type: 'molecule:foo',
      pattern: {
        type: 'foo',
        children: [
          {
            type: 'foo',
          },
          {
            type: 'foo',
          },
        ],
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['children', 0, 'type'], 'foo');
    expect(t1).toHaveProperty(['children', 1, 'type'], 'foo');
  });

  test('#isSame', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.create('foo');

    expect(t1).not.toBe(t2);
    expect(t1).not.toEqual(t2);
    expect(Tree.isSame(t1, t2)).toBeTruthy();
  });

  test('#isEqual', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.create('foo');

    expect(Tree.isEqual(t1, t2)).toBeFalsy();
  });

  test('#copy', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.copy(t1);

    expect(Tree.isEqual(t1, t2)).toBeTruthy();
    expect(Tree.isSame(t1, t2)).toBeTruthy();
  });

  test('#copy w/ makeNewIds', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.copy(t1, true);

    expect(Tree.isEqual(t1, t2)).toBeFalsy();
    expect(Tree.isSame(t1, t2)).toBeTruthy();
  });

  test('#hydrate', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.hydrate(t1);
    const t3 = Tree.hydrate(t1);

    expect(t2).toBe(t3);
    expect(t1).not.toHaveProperty('parent');
    expect(t1).not.toHaveProperty('children');
    expect(t2).toHaveProperty('parent');
    expect(t2).not.toHaveProperty('children');
  });
});
