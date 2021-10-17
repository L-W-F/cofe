import { useStore } from '@cofe/store';
import { EditorState } from '@/store/editor';
import { Tree } from '@cofe/core';

export const useSelectedTree = () => {
  return useStore<EditorState['stack'][number]>(
    ({ editor: { stack, cursor } }) => Tree.hydrate(stack[cursor]),
  );
};
