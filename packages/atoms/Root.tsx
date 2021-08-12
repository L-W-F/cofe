import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStore } from '@cofe/store';

interface RootAtomProps extends BoxProps {}

export const RootAtom = (props: RootAtomProps) => {
  const isEditorMode = useStore<boolean>('whoami.config.editMode');

  return (
    <Box
      _empty={
        isEditorMode
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
