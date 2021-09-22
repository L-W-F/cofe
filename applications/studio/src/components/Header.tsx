import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { GithubIcon } from '@cofe/icons';
import { ColorModeSwitch } from './header/ColorModeSwitch';
import { Logo } from './header/Logo';
import { Whoami } from './header/Whoami';

export const Header = ({ children = <Box flex={1} /> }: FlexProps) => {
  return (
    <Flex
      px={3}
      py={1}
      bg={useColorModeValue('white', 'gray.800')}
      gridGap={3}
      alignItems="center"
      justifyItems="flex-end"
    >
      <NextLink aria-label="返回首页" href="/" passHref>
        <Link>
          <Logo />
        </Link>
      </NextLink>
      {children}
      <ColorModeSwitch />
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
      <Whoami />
    </Flex>
  );
};
