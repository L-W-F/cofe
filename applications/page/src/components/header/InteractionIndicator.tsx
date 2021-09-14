import React from 'react';
import { Box } from '@chakra-ui/react';
import { useStore } from '@cofe/store';

export const InteractionIndicator = () => {
  const dragging = useStore('dnd.dragging');
  const selected = useStore('editor.selected');

  return <Box>{`<${dragging?.type ?? selected?.type ?? ''} />`}</Box>;
};
