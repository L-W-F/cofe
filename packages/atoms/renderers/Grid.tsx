import React from 'react';
import { Grid, GridProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface GridRendererProps extends CofeRendererProps, GridProps {
  rows?: number;
  columns?: number;
}

export const GridRenderer = ({
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
    </Grid>
  );
};
