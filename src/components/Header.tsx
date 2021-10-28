import React from 'react';
import { Box } from '@chakra-ui/react';
import { AppBar, AppBarProps, Toolbar } from '@cofe/ui';

export const Header = ({
  children = <Box flex={1} />,
  ...props
}: AppBarProps) => {
  return (
    <AppBar mb={4} {...props}>
      <Toolbar gridGap={2}>{children}</Toolbar>
    </AppBar>
  );
};
