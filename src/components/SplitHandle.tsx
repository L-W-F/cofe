import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useSplitPane } from '@cofe/hooks';

export const SplitHandle = (
  props: ReturnType<typeof useSplitPane>['handleProps'],
) => {
  return (
    <Box
      cursor="col-resize"
      px={0.5}
      width={2}
      flexGrow={0}
      flexShrink={0}
      flexBasis={2}
      userSelect="none"
      _hover={{
        '&:before': {
          content: '""',
          display: 'block',
          height: '100%',
          bgColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        },
      }}
      _active={{
        '&:before': {
          bgColor: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
        },
      }}
      {...props}
    />
  );
};
