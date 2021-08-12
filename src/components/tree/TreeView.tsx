import React from 'react';
import { List } from '@chakra-ui/react';
import { useCurrentTree } from '../../hooks/useCurrentTree';
import { TreeViewItem } from './TreeViewItem';

export const TreeView = () => {
  const tree = useCurrentTree();

  return (
    <List>
      <TreeViewItem {...tree} />
    </List>
  );
};
