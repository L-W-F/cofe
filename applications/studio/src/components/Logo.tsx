import React from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { CofeIcon } from '@cofe/icons';

export const Logo = () => {
  return (
    <NextLink aria-label="返回首页" href="/" passHref>
      <Link>
        <CofeIcon />
      </Link>
    </NextLink>
  );
};
