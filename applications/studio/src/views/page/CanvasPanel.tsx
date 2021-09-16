import React from 'react';
import { useStore } from '@cofe/store';
import { Pane, PaneProps } from 'components/layout/Pane';
import { useSelectedTree } from 'hooks/useSelectedTree';
import { DesignCanvas } from './design/Canvas';
import { PreviewCanvas } from './preview/Canvas';

export const CanvasPane = (props: PaneProps) => {
  const tree = useSelectedTree();
  const isEditorMode = useStore<boolean>('whoami.config.editMode');

  return !isEditorMode ? (
    <Pane p={4} {...props}>
      <PreviewCanvas tree={tree} />
    </Pane>
  ) : (
    <Pane p={4} overflow="visible" {...props}>
      <DesignCanvas tree={tree} />
    </Pane>
  );
};
