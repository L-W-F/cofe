import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface RootAtomProps extends AtomProps, BoxProps {}

export const RootAtom = ({ isDesign, ...props }: RootAtomProps) => {
  return (
    <Box
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Root"',
                color: 'gray.400',
                height: 'calc(100%)',
              },
            }
          : null
      }
      {...props}
    />
  );
};
