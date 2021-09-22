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
import { useDispatch, useStore } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';
import { post } from 'utils/io';

export const Whoami = () => {
  const whoami = useStore<CofeWhoami>('whoami');
  const dispatch = useDispatch();
  const { push } = useRouter();

  if (!whoami?.username) {
    return null;
  }

  return (
    <Menu matchWidth size="small">
      <MenuButton aria-label={whoami.username}>
        <Avatar size="xs" name={whoami.username} />
      </MenuButton>
      <MenuList minW="initial">
        <NextLink href="/account" passHref>
          <MenuItem as={Link}>账户</MenuItem>
        </NextLink>
        <MenuItem
          onClick={async (e) => {
            try {
              await post('/api/logout', null);
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
