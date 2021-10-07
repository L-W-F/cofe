import { useStore } from '@cofe/store';
import { parents } from 'unist-util-parents';
import { EditorState } from '@/store/editor';
import { treeCache } from '@/utils/cache';

export const useSelectedTree = () => {
  const { stack, cursor } = useStore<EditorState>('editor');

  const tree = stack[cursor];

  if (!treeCache.has(tree)) {
    treeCache.set(tree, parents(tree));
  }

  return treeCache.get(tree);
};
