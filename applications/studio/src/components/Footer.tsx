import React from 'react';
import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';

export const Footer = ({ children = <Box flex={1} /> }: FlexProps) => {
  return (
    <Flex
      px={3}
      py={1}
      bg={useColorModeValue('white', 'gray.800')}
      gridGap={3}
      alignItems="center"
      justifyItems="flex-end"
    >
      {children}
    </Flex>
  );
};
