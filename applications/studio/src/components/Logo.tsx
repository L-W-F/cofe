import React from 'react';
import NextLink from 'next/link';
import { Icon, Link } from '@chakra-ui/react';
import { CofeIcon } from '@cofe/icons';

export const Logo = () => {
  return (
    <NextLink aria-label="返回首页" href="/" passHref>
      <Link>
        <Icon as={CofeIcon} w="6" h="6" />
      </Link>
    </NextLink>
  );
};
