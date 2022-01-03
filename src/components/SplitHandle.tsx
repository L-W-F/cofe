import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useSplitPane } from '@cofe/hooks';

export const SplitHandle = (
  props: ReturnType<typeof useSplitPane>['handleProps'],
) => {
  return (
    <Box
      cursor="col-resize"
      position="relative"
      width={4}
      flexGrow={0}
      flexShrink={0}
      flexBasis={4}
      userSelect="none"
      _before={{
        content: '""',
        display: 'block',
        height: '100%',
        bgColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      _after={{
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 'calc(50% - 4px)',
        left: 1,
        right: 1,
        height: 8,
        borderRadius: '8px',
        bgColor: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
      }}
      {...props}
    />
  );
};
