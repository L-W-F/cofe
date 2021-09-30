import React, { Children } from 'react';
import { Box, Grid, GridProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface GridAtomProps extends AtomProps, GridProps {
  rows?: number;
  columns?: number;
}

export const GridAtom = ({
  isDesign,
  rows,
  columns,
  children,
  ...props
}: GridAtomProps) => {
  return (
    <Grid
      gridTemplateRows={`repeat(${rows}, 1fr)`}
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      {...props}
    >
      {children}
      {isDesign
        ? createChildren(rows, columns, Children.count(children))
        : null}
    </Grid>
  );
};

function createChildren(rows, columns, count) {
  return Array(Math.max(0, rows * columns - count))
    .fill(0)
    .map((_, index) => (
      <Box key={index} color="gray.400">
        Grid Item {index}
      </Box>
    ));
}
