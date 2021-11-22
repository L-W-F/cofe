import { CofeTree } from '@cofe/types';
import { select } from 'unist-util-select';
import { useSelectedTree } from './useSelectedTree';
import { studioStore } from '@/store';

export const useSelectedNode = () => {
  const tree = useSelectedTree();
  const selected = studioStore.useValue('dnd.selected');

  return selected?.id
    ? (select(`[id=${selected.id}]`, tree as any) as CofeTree)
    : null;
};
