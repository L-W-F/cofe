import React from 'react';
import { Box } from '@chakra-ui/react';
import { Toolbar } from '@cofe/ui';
import { DownloadDsl } from './DownloadDsl';
import { ModeSwitch } from './ModeSwitch';
import { PageManager } from './PageManager';
import { SaveTemplate } from './SaveTemplate';
import { UndoRedo } from './UndoRedo';

export const CanvasToolbar = () => {
  return (
    <Toolbar flex={1}>
      <PageManager />
      <UndoRedo />
      <Box flex={1} />
      <ModeSwitch />
      <Box flex={1} />
      <SaveTemplate />
      <DownloadDsl />
    </Toolbar>
  );
};
