import React from 'react';
import { Box, BoxProps, VStack } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { Paper, Toolbar } from '@cofe/ui';
import { DesignCanvas } from './DesignCanvas';
import { DropMenu } from './DropMenu';
import { ModeSwitch } from './ModeSwitch';
import { PreviewCanvas } from './PreviewCanvas';
import { SelectedPath } from './SelectedPath';
import { SourceCanvas } from './SourceCanvas';
import { UndoRedo } from './UndoRedo';
import { EditorState, MODE_DESIGN, MODE_SOURCE } from '@/store/editor';

export const CanvasPanel = (props: BoxProps) => {
  const mode = useStore<EditorState['mode']>('editor.mode');

  const Canvas =
    mode === MODE_DESIGN
      ? DesignCanvas
      : mode === MODE_SOURCE
      ? SourceCanvas
      : PreviewCanvas;

  return (
    <VStack alignItems="stretch" {...props}>
      <Toolbar size="sm">
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <ModeSwitch />
      </Toolbar>
      <Paper flex={1} p={4}>
        <Canvas />
      </Paper>
      <Toolbar size="sm">
        <SelectedPath />
      </Toolbar>
    </VStack>
  );
};
