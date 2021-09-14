import React, { memo } from 'react';
import Link from 'next/link';
import {
  Box,
  Link as ChakraLink,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { GithubIcon } from '@cofe/icons';
import shallowEqual from 'shallowequal';
import { ColorModeSwitch } from './header/ColorModeSwitch';
import { Logo } from './header/Logo';
import { Whoami } from './header/Whoami';

export const Header = memo(({ children = <Box flex={1} /> }: FlexProps) => {
  return (
    <Flex
      as={Flex}
      px={3}
      py={1}
      bg={useColorModeValue('white', 'gray.800')}
      gridGap={3}
      alignItems="center"
      justifyItems="flex-end"
    >
      <Link aria-label="Go to home page" href="/" passHref>
        <ChakraLink>
          <Logo />
        </ChakraLink>
      </Link>
      {children}
      <ColorModeSwitch />
      <ChakraLink
        isExternal
        aria-label="Go to COFE GitHub page"
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
      </ChakraLink>
      <Whoami />
    </Flex>
  );
}, shallowEqual);
