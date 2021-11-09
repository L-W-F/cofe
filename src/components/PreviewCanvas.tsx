import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { CofeTree } from '@cofe/types';
import { useSelectedTree } from '@/hooks/useSelectedTree';

interface NodeRendererProps extends CofeTree {}

export const NodeRenderer = ({
  type,
  id,
  properties,
  actions,
  children,
}: NodeRendererProps) => {
  const R = Renderer.get(type);

  if (R) {
    return (
      <R key={id} id={id} {...properties} actions={actions}>
        {children?.map(NodeRenderer)}
      </R>
    );
  }

  return (
    <Box key={id} id={id}>
      未知节点
    </Box>
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
