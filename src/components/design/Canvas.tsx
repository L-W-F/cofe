import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { pick } from 'lodash';
import { useDrop } from '../../hooks/useDrop';
import { useDispatch } from '../../store';
import { CofeTree } from '../../types';
import { isMac } from '../../utils/isMac';
import { DesignNodeRenderer } from './NodeRenderer';

interface DesignCanvasProps extends BoxProps {
  tree: CofeTree;
}

export const DesignCanvas = ({ tree, ...props }: DesignCanvasProps) => {
  const dispatch = useDispatch();

  const handleKeyDown = async (e: any) => {
    // Delete
    // ⌘+Backspace
    if (e.key === 'Delete' || (e.key === 'Backspace' && isMac && e.metaKey)) {
      dispatch('DELETE_NODE')(null);

      e.currentTarget.focus();
    }

    // Escape
    if (e.key === 'Escape') {
      dispatch('SELECT_NODE')(null);

      e.currentTarget.focus();
    }
  };

  const handleFocus = (e) => {
    if (e.target.dataset) {
      dispatch('SELECT_NODE')(pick(e.target.dataset, ['type', 'id']));
    } else {
      dispatch('SELECT_NODE')(null);
    }
  };

  const cellColor = useColorModeValue(
    'var(--chakra-colors-blackAlpha-200)',
    'var(--chakra-colors-whiteAlpha-50)',
  );

  const [, drop] = useDrop({
    onDrop: (payload) => {
      dispatch('DROPPING_NODE')(payload);
    },
  });

  return (
    <Box
      ref={drop}
      bgImage={`
      linear-gradient(45deg, ${cellColor} 25%, transparent 25%),
      linear-gradient(-45deg, ${cellColor} 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${cellColor} 75%),
      linear-gradient(-45deg, transparent 75%, ${cellColor} 75%);
      `}
      bgSize="20px 20px"
      bgPosition="0 0, 0 10px, 10px -10px, -10px 0px"
      tabIndex={0}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <DesignNodeRenderer {...tree} />
    </Box>
  );
};
