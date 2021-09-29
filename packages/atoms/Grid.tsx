import React from 'react';
import { Grid, GridProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface GridAtomProps extends AtomProps, GridProps {
  rows?: number;
  columns?: number;
}

export const GridAtom = ({
  isDesign,
  rows = 1,
  columns = 1,
  ...props
}: GridAtomProps) => {
  return (
    <Grid
      _empty={
        isDesign
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
