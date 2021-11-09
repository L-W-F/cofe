import React from 'react';
import { Box } from '@chakra-ui/react';
import { AppBar, Toolbar, ToolbarProps } from '@cofe/ui';

export const Header = ({
  children = <Box flex={1} />,
  ...props
}: ToolbarProps) => {
  return (
    <AppBar mb={4}>
      <Toolbar gridGap={2} {...props}>
        {children}
      </Toolbar>
    </AppBar>
  );
};
