import { CofeSchema } from '@cofe/types';
import { Schema } from './Schema';
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
    Schema.add({
      type: 'foo',
      properties: {
        type: 'object',
        properties: {
          bar: {
            type: 'string',
          },
        },
      },
    });

    const t1 = Tree.create('foo');

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'bar'], '');

    Schema.del('foo');
  });

  test('#create w/ actions', () => {
    const t1 = Tree.create({
      type: 'foo',
      actions: {
        type: 'object',
        properties: {
          bar: {
            type: 'string',
          },
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['actions', 'bar'], '');
  });

  const templateSchemaBase: CofeSchema = {
    type: 'foo',
  };

  const templateSchemaProperties: CofeSchema['properties'] = {
    type: 'object',
    properties: {
      bar: {
        type: 'string',
        default: 'foobar',
      },
      baz: {
        type: 'string',
        default: 'foobar',
      },
    },
  };

  const templateSchemaActions: CofeSchema['actions'] = {
    type: 'object',
    properties: {
      bar: {
        type: 'string',
        default: 'foobar',
      },
      baz: {
        type: 'string',
        default: 'foobar',
      },
    },
  };

  test('#create w/ template', () => {
    Schema.add(templateSchemaBase);

    const t1 = Tree.create({
      type: 'template:foo',
      template: {
        type: 'foo',
        properties: {
          baz: 'bar',
        },
        actions: {
          bar: 'baz',
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'baz'], 'bar');
    expect(t1).toHaveProperty(['actions', 'bar'], 'baz');

    Schema.del('foo');
  });

  test('#create w/ template w/properties', () => {
    Schema.add({ ...templateSchemaBase, properties: templateSchemaProperties });

    const t1 = Tree.create({
      type: 'template:foo',
      template: {
        type: 'foo',
        properties: {
          baz: 'bar',
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['properties', 'bar'], 'foobar');
    expect(t1).toHaveProperty(['properties', 'baz'], 'bar');

    Schema.del('foo');
  });

  test('#create w/ template w/actions', () => {
    Schema.add({ ...templateSchemaBase, actions: templateSchemaActions });

    const t1 = Tree.create({
      type: 'template:foo',
      template: {
        type: 'foo',
        actions: {
          bar: 'baz',
        },
      },
    });

    expect(t1).toHaveProperty('type', 'foo');
    expect(t1).toHaveProperty('id');
    expect(t1).toHaveProperty(['actions', 'bar'], 'baz');
    expect(t1).toHaveProperty(['actions', 'baz'], 'foobar');

    Schema.del('foo');
  });

  test('#create w/ template w/ children', () => {
    Schema.add(templateSchemaBase);

    const t1 = Tree.create({
      type: 'template:foo',
      template: {
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

    Schema.del('foo');
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
