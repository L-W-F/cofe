import React from 'react';
import { Box, BoxProps, VStack } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { CofeConfig } from '@cofe/types';
import { Paper, Toolbar } from '@cofe/ui';
import { DesignCanvas } from './DesignCanvas';
import { DropMenu } from './DropMenu';
import { EditModeSwitch } from './EditModeSwitch';
import { PreviewCanvas } from './PreviewCanvas';
import { SelectedPath } from './SelectedPath';
import { UndoRedo } from './UndoRedo';
import { useSelectedTree } from '@/hooks/useSelectedTree';
import { EDIT_MODE_DESIGN } from '@/store/config';

export const CanvasPanel = (props: BoxProps) => {
  const tree = useSelectedTree();
  const editorMode = useStore<CofeConfig['editorMode']>('config.editorMode');

  const Canvas = editorMode === EDIT_MODE_DESIGN ? DesignCanvas : PreviewCanvas;

  return (
    <VStack alignItems="stretch" {...props}>
      <Toolbar size="sm">
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <EditModeSwitch />
      </Toolbar>
      <Paper flex={1} p={4}>
        <Canvas tree={tree} />
      </Paper>
      <Toolbar size="sm">
        <SelectedPath />
      </Toolbar>
    </VStack>
  );
};
