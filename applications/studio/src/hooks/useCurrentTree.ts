import { useStore } from '@cofe/store';
import { parents } from 'unist-util-parents';
import { EditorState } from '@/store/editor';
import { treeCache } from '@/utils/cache';

export const useCurrentTree = () => {
  const { stack } = useStore<EditorState>('editor');

  const tree = stack[stack.length - 1];

  if (!treeCache.has(tree)) {
    treeCache.set(tree, parents(tree));
  }

  return treeCache.get(tree);
};
