import { CofeTree } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { isEqual, isEqualWith, merge } from 'lodash';
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

    return tree as CofeTree;
  }

  static append(node: Partial<CofeTree> | string, tree: CofeTree) {
    node = Tree.create(node);

    if (!tree.children) {
      tree.children = [];
    }

    tree.children.push(node as CofeTree);

    return tree;
  }

  static prepend(node: Partial<CofeTree> | string, tree: CofeTree) {
    node = Tree.create(node);

    if (!tree.children) {
      tree.children = [];
    }

    tree.children.unshift(node as CofeTree);

    return tree;
  }

  static clone(tree: CofeTree) {
    return map(tree as CofeTree, ({ children, ...node }: CofeTree) => {
      return merge({}, node, {
        id: makeId(),
      });
    }) as CofeTree;
  }

  static isEqual(tree1: CofeTree, tree2: CofeTree) {
    return isEqual(tree1, tree2);
  }

  static isSame(tree1: CofeTree, tree2: CofeTree) {
    return isEqualWith(tree1, tree2, (v1, v2, key) => {
      if (key === 'id') {
        return true;
      }
    });
  }

  static hydrate(tree: CofeTree) {
    if (!cache.has(tree)) {
      cache.set(tree, parents(tree as any) as CofeTree);
    }

    return cache.get(tree);
  }
}
