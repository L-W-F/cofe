import { Tree } from '@cofe/core';
import { studioStore } from '@/store';
import { EditorState } from '@/store/editor';

export const useSelectedTree = () => {
  return studioStore.useValue<EditorState['stack'][number]>(
    ({ editor: { stack, cursor } }) => Tree.hydrate(stack[cursor]),
  );
};
