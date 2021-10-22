import React from 'react';
import { HStack, Link, StackProps, Text } from '@chakra-ui/react';
import { GithubIcon } from '@cofe/icons';
import { Paper } from '@cofe/ui';

export const Footer = ({ children, ...props }: StackProps) => {
  return (
    <Paper
      as={HStack}
      rounded={0}
      mt={4}
      py={3}
      px={4}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Text>&copy; {new Date().getFullYear()}</Text>
      <Link
        isExternal
        aria-label="查看代码仓库"
        href="https://github.com/crossjs/cofe"
      >
        <GithubIcon
          display="block"
          transition="color 0.2s"
          _hover={{ color: 'gray.600' }}
        />
      </Link>
      {children}
    </Paper>
  );
};
