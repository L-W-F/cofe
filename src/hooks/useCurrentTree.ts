import { parents } from 'unist-util-parents';
import { useStore } from '../store';

const cache = new WeakMap();

export const useCurrentTree = () => {
  const [stack, cursor] = useStore(['page.stack', 'page.cursor']);

  const tree = stack[cursor];

  if (!cache.has(tree)) {
    cache.set(tree, parents(tree));
  }

  return cache.get(tree);
};
