import { Tree } from '@cofe/core';
import { useStore } from '@cofe/store';
import { EditorState } from '@/store/editor';

export const useSelectedTree = () => {
  return useStore<EditorState['stack'][number]>(
    ({ editor: { stack, cursor } }) => Tree.hydrate(stack[cursor]),
  );
};
