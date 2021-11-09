import React from 'react';
import NextLink from 'next/link';
import { Avatar, Link } from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { WhoamiState } from '@/store/whoami';

export const Whoami = () => {
  const user = useStore<WhoamiState>('whoami');

  return !user?.username ? (
    <NextLink href="/login" passHref>
      <Avatar as={Link} title=" 请先登录" size="xs" name="?" />
    </NextLink>
  ) : (
    <NextLink href="/profile" passHref>
      <Avatar
        as={Link}
        title="个人设置"
        size="xs"
        name={user.username}
        src={user.avatar_url}
      />
    </NextLink>
  );
};
