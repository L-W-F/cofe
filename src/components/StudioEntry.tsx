import React from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { DesignIcon } from '@cofe/icons';

export const StudioEntry = () => {
  return (
    <NextLink aria-label="返回工作室" href="/studio" passHref>
      <Link>
        <DesignIcon boxSize="6" />
      </Link>
    </NextLink>
  );
};
