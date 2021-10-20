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
import { CofeWhoami } from '@cofe/types';
import { supabase } from '@/utils/supabase';

export const Whoami = () => {
  const user_metadata = useStore<CofeWhoami['user_metadata']>(
    'whoami.user_metadata',
  );
  const dispatch = useDispatch();
  const { push } = useRouter();

  if (!user_metadata?.user_name) {
    return null;
  }

  return (
    <Menu matchWidth size="small">
      <MenuButton
        aria-label={user_metadata.user_name}
        title={user_metadata.user_name}
      >
        <Avatar size="xs" name={user_metadata.user_name} />
      </MenuButton>
      <MenuList minW="initial">
        <NextLink href="/account" passHref>
          <MenuItem as={Link}>账户</MenuItem>
        </NextLink>
        <MenuItem
          onClick={async (e) => {
            try {
              await post('/api/logout', null);
              await supabase.auth.signOut();

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
