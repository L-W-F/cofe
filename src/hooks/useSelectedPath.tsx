import { useMemo } from 'react';
import { useSelectedNode } from './useSelectedNode';

export const useSelectedPath = () => {
  const selected = useSelectedNode();

  return useMemo(() => {
    const nodes = [];

    let current = selected;

    while (current) {
      nodes.push(current);

      current = current.parent;
    }

    return nodes;
  }, [selected]);
};
