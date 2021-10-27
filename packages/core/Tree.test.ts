import { Tree } from './Tree';

describe('Tree', () => {
  test('#create', () => {
    const t1 = Tree.create('foo');

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
  });

  test('#create 2', () => {
    const t1 = Tree.create({ type: 'foo' });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
  });

  test('#create 3', () => {
    const t1 = Tree.create({ type: 'foo', id: 'fake' });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
  });

  test('#append', () => {
    const t1 = Tree.create('foo');

    Tree.append('bar', t1);
    Tree.append('baz', t1);

    expect(t1).toHaveProperty(['children', 0, 'type'], 'bar');
    expect(t1).toHaveProperty(['children', 0, 'id']);
    expect(t1).toHaveProperty(['children', 1, 'type'], 'baz');
    expect(t1).toHaveProperty(['children', 1, 'id']);
  });

  test('#prepend', () => {
    const t1 = Tree.create('foo');

    Tree.prepend('bar', t1);
    Tree.prepend('baz', t1);

    expect(t1).toHaveProperty(['children', 0, 'type'], 'baz');
    expect(t1).toHaveProperty(['children', 0, 'id']);
    expect(t1).toHaveProperty(['children', 1, 'type'], 'bar');
    expect(t1).toHaveProperty(['children', 1, 'id']);
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

  test('#clone', () => {
    const t1 = Tree.create('foo');
    const t2 = Tree.clone(t1);

    expect(Tree.isEqual(t1, t2)).toBeFalsy();
    expect(Tree.isSame(t1, t2)).toBeTruthy();
  });

  test('#clone 2', () => {
    const t1 = Tree.create({ type: 'foo' });

    Tree.append({ type: 'bar' }, t1);

    const t2 = Tree.clone(t1);

    expect(Tree.isEqual(t1, t2)).toBeFalsy();
    expect(Tree.isSame(t1, t2)).toBeTruthy();

    expect(Tree.isEqual(t1.children[0], t2.children[0])).toBeFalsy();
    expect(Tree.isSame(t1.children[0], t2.children[0])).toBeTruthy();
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

  test('#hydrate#2', () => {
    const t1 = Tree.create({ type: 'foo' });

    Tree.append({ type: 'bar' }, t1);

    const t2 = Tree.hydrate(t1);

    expect(t2).toHaveProperty('parent');
    expect(t2).toHaveProperty('children');
    expect(t2.children[0]).toHaveProperty('parent');
  });
});
