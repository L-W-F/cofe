import React from 'react';
import { Flex, FlexProps, Progress, useColorModeValue } from '@chakra-ui/react';

export interface ContainerProps extends FlexProps {
  loading?: boolean;
}

export const Container = ({ children, loading, ...props }: ContainerProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <Flex
      minWidth="100vw"
      minHeight="100vh"
      direction="column"
      p={2}
      gridGap={2}
      bg={bgColor}
      color={color}
      {...props}
    >
      {loading ? (
        <Progress
          pos="fixed"
          top={2}
          left={2}
          right={2}
          size="xs"
          isIndeterminate
        />
      ) : null}
      {children}
    </Flex>
  );
};
