import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Atom } from '@cofe/atoms';
import { CofeTree } from '@cofe/types';

interface NodeRendererProps extends CofeTree {}

export const NodeRenderer = ({
  type,
  id,
  properties,
  children,
}: NodeRendererProps) => {
  const A = Atom.get(type);

  if (A) {
    return (
      <A key={id} id={id} {...properties}>
        {children?.map(NodeRenderer)}
      </A>
    );
  }

  return (
    <Box key={id} id={id}>
      未知节点
    </Box>
  );
};

interface PreviewCanvasProps extends BoxProps {
  tree: CofeTree;
}

export const PreviewCanvas = ({ tree, ...props }: PreviewCanvasProps) => {
  return (
    <Box {...props}>
      <NodeRenderer {...tree} />
    </Box>
  );
};

if (process.env.NODE_ENV === 'development') {
  PreviewCanvas.displayName = 'PreviewCanvas';
}
