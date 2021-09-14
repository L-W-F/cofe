import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { CofeTree } from '@cofe/types';
import { PreviewNodeRenderer } from './NodeRenderer';

interface PreviewCanvasProps extends BoxProps {
  tree: CofeTree;
}

export const PreviewCanvas = ({ tree, ...props }: PreviewCanvasProps) => {
  return (
    <Box {...props}>
      <PreviewNodeRenderer {...tree} />
    </Box>
  );
};
