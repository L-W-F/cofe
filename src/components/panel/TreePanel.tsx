import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { Pane } from '../layout/Pane';
import { TreeView } from '../tree/TreeView';

export const TreePanel = memo(() => {
  return (
    <Pane heading="Tree">
      <TreeView />
    </Pane>
  );
}, shallowEqual);
