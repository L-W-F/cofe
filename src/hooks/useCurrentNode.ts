import { select } from 'unist-util-select';
import { useStore } from '../store';
import { CofeTree } from '../types';
import { useCurrentTree } from './useCurrentTree';

export const useCurrentNode = () => {
  const tree = useCurrentTree();
  const selected = useStore('page.selected');

  return selected?.id
    ? (select(`[id=${selected.id}]`, tree) as CofeTree)
    : null;
};
