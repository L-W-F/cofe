import React from 'react';
import { Link } from '@chakra-ui/react';
import { GithubIcon } from '@cofe/icons';

export const RepoEntry = () => {
  return (
    <Link
      isExternal
      aria-label="查看代码仓库"
      href="https://github.com/crossjs/cofe"
    >
      <GithubIcon boxSize="6" />
    </Link>
  );
};

if (process.env.NODE_ENV === 'development') {
  RepoEntry.displayName = 'RepoEntry';
}
