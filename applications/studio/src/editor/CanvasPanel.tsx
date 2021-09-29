import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { CofeConfig } from '@cofe/types';
import { Paper } from '@cofe/ui';
import { DesignCanvas } from './design/Canvas';
import { PreviewCanvas } from './preview/Canvas';
import { useSelectedTree } from '@/hooks/useSelectedTree';
import { EDIT_MODE_DESIGN } from '@/store/config';

export const CanvasPane = (props: BoxProps) => {
  const tree = useSelectedTree();
  const editorMode = useStore<CofeConfig['editorMode']>('config.editorMode');

  const Canvas = editorMode === EDIT_MODE_DESIGN ? DesignCanvas : PreviewCanvas;

  return (
    <Paper p={4} {...props}>
      <Canvas tree={tree} />
    </Paper>
  );
};
