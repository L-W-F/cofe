import React from 'react';
import { Grid, GridProps } from '@chakra-ui/react';
import { useStore } from '@cofe/store';

interface GridAtomProps extends GridProps {
  rows?: number;
  columns?: number;
}

export const GridAtom = ({
  rows = 1,
  columns = 1,
  ...props
}: GridAtomProps) => {
  const isEditorMode = useStore<boolean>('config.editMode');

  return (
    <Grid
      _empty={
        isEditorMode
          ? {
              '&:before': {
                content: '"Grid"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      gridTemplateRows={`repeat(${rows}, 1fr)`}
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      {...props}
    />
  );
};
