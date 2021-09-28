import React from 'react';
import { Icon, Link, StackProps, Text, VStack } from '@chakra-ui/react';
import { GithubIcon } from '@cofe/icons';
import { Paper } from '@cofe/ui';
import { formatDate } from '@cofe/utils';

export const Footer = ({ children = formatDate(Date.now()) }: StackProps) => {
  return (
    <Paper
      as={VStack}
      rounded={0}
      mt={4}
      p={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>&copy; {new Date().getFullYear()}</Text>
      <Link
        isExternal
        aria-label="查看代码仓库"
        href="https://github.com/crossjs/cofe"
      >
        <Icon
          as={GithubIcon}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: 'gray.600' }}
        />
      </Link>
      <Text fontSize="xs">{children}</Text>
    </Paper>
  );
};
