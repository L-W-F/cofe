import React, { Children, Fragment, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface FragmentRendererProps extends CofeRendererProps {
  children?: ReactNode;
}

export const FragmentRenderer = ({
  isDesign,
  children,
}: FragmentRendererProps) => {
  return (
    <Fragment>
      {isDesign ? (
        Children.count(children) ? (
          children
        ) : (
          <Box color="gray.400" height={'calc(100%)'}>
            Fragment
          </Box>
        )
      ) : (
        children
      )}
    </Fragment>
  );
};
