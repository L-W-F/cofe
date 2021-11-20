import { Tree } from '@cofe/core';
import { useValue } from '@cofe/store';
import { EditorState } from '@/store/editor';

export const useSelectedTree = () => {
  return useValue<EditorState['stack'][number]>(
    ({ editor: { stack, cursor } }) => Tree.hydrate(stack[cursor]),
  );
};
