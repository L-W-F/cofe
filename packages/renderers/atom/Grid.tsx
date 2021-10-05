import React, { Children } from 'react';
import { Box, Grid, GridProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface GridRendererProps extends CofeRendererProps, GridProps {
  rows?: number;
  columns?: number;
}

export const GridRenderer = ({
  isDesign,
  rows,
  columns,
  children,
  ...props
}: GridRendererProps) => {
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
