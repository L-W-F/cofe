import { CofeTree } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { merge } from 'lodash';
import { u } from 'unist-builder';
import { map } from 'unist-util-map';
import { parents } from 'unist-util-parents';

export const cache = new WeakMap<object, CofeTree>();

export class Tree {
  static create(tree: Partial<CofeTree> | string) {
    if (typeof tree === 'string') {
      tree = u(tree);
    }

    if (!('id' in tree)) {
      tree.id = makeId();
    }

    return tree;
  }

  static clone(tree: Partial<CofeTree>) {
    return map(tree as any, (node) => {
      return merge({}, node, {
        id: makeId(),
      });
    });
  }

  static hydrate(tree: Partial<CofeTree>) {
    if (!cache.has(tree)) {
      cache.set(tree, parents(tree as any) as CofeTree);
    }

    return cache.get(tree);
  }
}
