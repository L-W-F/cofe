import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

export interface RootProps extends FlexProps {
  loading?: boolean;
}

export const Root = ({
  children,
  direction = 'column',
  minH = '100vh',
  ...props
}: FlexProps) => {
  return (
    <Flex direction={direction} minH={minH} {...props}>
      {children}
    </Flex>
  );
};
