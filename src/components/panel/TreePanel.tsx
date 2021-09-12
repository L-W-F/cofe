import React from 'react';
import { Pane } from '../layout/Pane';
import { TreeView } from '../tree/TreeView';

export const TreePanel = () => {
  return (
    <Pane heading="Tree">
      <TreeView />
    </Pane>
  );
};
