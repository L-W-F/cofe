import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Tag } from '@chakra-ui/react';
import { useDispatch } from '@cofe/store';
import { pick } from 'lodash';
import { useSelectedNode } from '@/hooks/useSelectedNode';

export const SelectedPath = () => {
  const selected = useSelectedNode();

  const dispatch = useDispatch();
  const nodes = [];

  const handleClick = (e) => {
    dispatch('SELECTED')(pick(e.target.dataset, ['type', 'id']));
  };

  let current = selected;

  while (current) {
    nodes.unshift(
      <Tag
        key={current.id}
        data-type={current.type}
        data-id={current.id}
        cursor="default"
        textTransform="capitalize"
        size="sm"
        variant={current === selected ? 'solid' : 'outline'}
        onClick={handleClick}
      >
        {current.type}
      </Tag>,
    );

    current = current.parent;

    if (current) {
      nodes.unshift(<ChevronRightIcon key={`icon-${current.id}`} />);
    }
  }

  return <>{nodes}</>;
};
