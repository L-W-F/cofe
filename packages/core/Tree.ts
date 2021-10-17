import { CofeTree } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { u } from 'unist-builder';
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

    tree.created_at = Date.now();

    return tree;
  }

  static hydrate(tree: Partial<CofeTree>) {
    if (!cache.has(tree)) {
      cache.set(tree, parents(tree as any) as CofeTree);
    }

    return cache.get(tree);
  }
}
