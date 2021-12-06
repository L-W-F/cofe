import React from 'react';
import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@cofe/icons';

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip hasArrow label="切换色彩模式">
      <IconButton
        aria-label="切换色彩模式"
        variant="ghost"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

if (process.env.NODE_ENV === 'development') {
  ColorModeSwitch.displayName = 'ColorModeSwitch';
}
