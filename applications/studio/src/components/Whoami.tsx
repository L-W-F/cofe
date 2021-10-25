import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { WhoamiState } from '@/store/whoami';
import { supabase } from '@/utils/supabase';

export const Whoami = () => {
  const user = useStore<WhoamiState>('whoami');
  const dispatch = useDispatch();
  const { push } = useRouter();

  if (!user?.username) {
    return null;
  }

  return (
    <Menu matchWidth size="small">
      <MenuButton aria-label={user.username} title={user.username}>
        <Avatar size="xs" name={user.username} src={user.avatar_url} />
      </MenuButton>
      <MenuList minW="initial">
        <NextLink href="/profile" passHref>
          <MenuItem as={Link}>个人设置</MenuItem>
        </NextLink>
        <MenuItem
          onClick={async (e) => {
            try {
              await Promise.all([
                post('/api/logout', null),
                supabase.auth.signOut(),
              ]);

              dispatch('CLEAR_LOGIN')(null);

              push('/login');
            } catch (error) {}
          }}
        >
          退出
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
