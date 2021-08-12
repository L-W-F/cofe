import React from 'react';
import { Box } from '@chakra-ui/react';
import { useStore } from '../../store';

export const InteractionIndicator = () => {
  const dragging = useStore('dnd.dragging');
  const selected = useStore('page.selected');

  return <Box>{`<${dragging?.type ?? selected?.type ?? ''} />`}</Box>;
};
