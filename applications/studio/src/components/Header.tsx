import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { CofeIcon } from '@cofe/icons';
import { post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';
import { AppBar, AppBarProps, Toolbar } from '@cofe/ui';

const Logo = () => {
  return <Icon as={CofeIcon} w="5" h="5" />;
};

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
};

const Whoami = () => {
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

export const Header = ({
  children = <Box flex={1} />,
  ...props
}: AppBarProps) => {
  return (
    <AppBar mb={4} {...props}>
      <Toolbar gridGap={2}>
        <NextLink aria-label="返回首页" href="/" passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
        {children}
        <ColorModeSwitch />
        <Whoami />
      </Toolbar>
    </AppBar>
  );
};
