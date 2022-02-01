import React, { useEffect, useState } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { CofeTree } from '@cofe/types';
import { useSelectedNode, useSelectedTree } from '@/store/editor';

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

const Highlight = () => {
  const selectedNode = useSelectedNode();
  const [props, setProps] = useState({
    opacity: 0,
  });

  useEffect(() => {
    if (selectedNode?.id) {
      const el = document.querySelector(`#${selectedNode.id}`);

      if (el) {
        el.scrollIntoViewIfNeeded();

        const { left, top, width, height } = el.getBoundingClientRect();

        setProps({
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${height}px`,
          opacity: 0.2,
        });

        return;
      }
    }

    setProps({
      opacity: 0,
    });
  }, [selectedNode]);

  return (
    props && (
      <Box
        position="fixed"
        zIndex={10}
        bgColor="red.500"
        shadow="outline"
        transition="all ease-in-out 500ms"
        pointerEvents="none"
        {...props}
      />
    )
  );
};

interface PreviewCanvasProps extends BoxProps {}

export const PreviewCanvas = (props: PreviewCanvasProps) => {
  const selectedTree = useSelectedTree();

  return (
    <Box {...props}>
      <Highlight />
      <NodeRenderer {...selectedTree} />
    </Box>
  );
};

if (process.env.NODE_ENV === 'development') {
  PreviewCanvas.displayName = 'PreviewCanvas';
}
