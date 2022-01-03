import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { CofeTree } from '@cofe/types';
import { useSelectedTree } from '@/store/editor';

interface NodeRendererProps extends CofeTree {}

export const NodeRenderer = ({
  type,
  id,
  properties,
  children,
}: NodeRendererProps) => {
  if (!(type in atoms)) {
    type = 'unknown';
  }

  const R = atoms[type].renderer;

  return (
    <R key={id} id={id} {...properties}>
      {children?.map(NodeRenderer)}
    </R>
  );
};

interface PreviewCanvasProps extends BoxProps {}

export const PreviewCanvas = (props: PreviewCanvasProps) => {
  const tree = useSelectedTree();

  return (
    <Box {...props}>
      <NodeRenderer {...tree} />
    </Box>
  );
};

if (process.env.NODE_ENV === 'development') {
  PreviewCanvas.displayName = 'PreviewCanvas';
}
