import React, { Children, Fragment, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface UnknownRendererProps extends CofeRendererProps {
  children?: ReactNode;
}

export const UnknownRenderer = ({
  isDesign,
  children,
}: UnknownRendererProps) => {
  return (
    <Fragment>
      {isDesign ? (
        Children.count(children) ? (
          children
        ) : (
          <Box color="gray.400" height={'calc(100%)'}>
            Unknown
          </Box>
        )
      ) : (
        children
      )}
    </Fragment>
  );
};
