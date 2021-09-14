import { useStore } from '@cofe/store';
import { CofeTree } from '@cofe/types';
import { select } from 'unist-util-select';
import { useCurrentTree } from './useCurrentTree';

export const useCurrentNode = () => {
  const tree = useCurrentTree();
  const selected = useStore('editor.selected');

  return selected?.id
    ? (select(`[id=${selected.id}]`, tree) as CofeTree)
    : null;
};
