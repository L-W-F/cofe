import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { DesignCanvas } from './design/Canvas';
import { PreviewCanvas } from './preview/Canvas';
import { useSelectedTree } from '@/hooks/useSelectedTree';

export const CanvasPane = (props: BoxProps) => {
  const tree = useSelectedTree();
  const isEditorMode = useStore<boolean>('config.editMode');

  const Canvas = isEditorMode ? DesignCanvas : PreviewCanvas;

  return (
    <Box
      p={4}
      borderWidth={1}
      borderStyle="solid"
      borderColor="silver"
      {...props}
    >
      <Canvas tree={tree} />
    </Box>
  );
};
