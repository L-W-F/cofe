import React from 'react';
import { Box } from '@chakra-ui/react';
import { Toolbar } from '@cofe/ui';
import { AppSettings } from './AppSettings';
import { DownloadDsl } from './DownloadDsl';
import { SaveMolecule } from './SaveMolecule';
import { UndoRedo } from './UndoRedo';

export const CanvasToolbar = () => {
  return (
    <Toolbar flex={1}>
      <AppSettings />
      <UndoRedo />
      <Box flex={1} />
      <SaveMolecule />
      <DownloadDsl />
    </Toolbar>
  );
};

if (process.env.NODE_ENV === 'development') {
  CanvasToolbar.displayName = 'CanvasToolbar';
}
