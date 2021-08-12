import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { useCurrentTree } from '../hooks/useCurrentTree';
import { useStore } from '../store';
import { DesignCanvas } from './design/Canvas';
import { Pane, PaneProps } from './layout/Pane';
import { PreviewCanvas } from './preview/Canvas';

export const CanvasPane = memo((props: PaneProps) => {
  const currentTree = useCurrentTree();
  const isEditorMode = useStore<boolean>('config.editMode');

  return !isEditorMode ? (
    <Pane p={4} {...props}>
      <PreviewCanvas tree={currentTree} />
    </Pane>
  ) : (
    <Pane p={4} overflow="visible" {...props}>
      <DesignCanvas flex={1} tree={currentTree} />
    </Pane>
  );
}, shallowEqual);
