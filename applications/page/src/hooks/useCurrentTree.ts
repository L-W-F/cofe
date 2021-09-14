import { useStore } from '@cofe/store';
import { parents } from 'unist-util-parents';
import { EditorState } from '../store/editor';

const cache = new WeakMap();

export const useCurrentTree = () => {
  const { stack, cursor } = useStore<EditorState>('editor');

  const tree = stack[cursor];

  if (!cache.has(tree)) {
    cache.set(tree, parents(tree));
  }

  return cache.get(tree);
};
