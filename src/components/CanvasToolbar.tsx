import React from 'react';
import { Box } from '@chakra-ui/react';
import { Toolbar } from '@cofe/ui';
import { DropMenu } from './DropMenu';
import { ModeSwitch } from './ModeSwitch';
import { UndoRedo } from './UndoRedo';

export const CanvasToolbar = () => {
  return (
    <Toolbar size="sm" flex={1}>
      <DropMenu />
      <UndoRedo />
      <Box flex={1} />
      <ModeSwitch />
    </Toolbar>
  );
};
