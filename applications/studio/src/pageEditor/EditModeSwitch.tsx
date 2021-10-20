import React from 'react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useDispatch, useStore } from '@cofe/store';
import { CofeConfig } from '@cofe/types';
import { EDIT_MODE_DESIGN } from '@/store/config';

export const EditModeSwitch = () => {
  const editorMode = useStore<CofeConfig['editorMode']>('config.editorMode');
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="Toggle edit mode"
      variant="ghost"
      icon={editorMode === EDIT_MODE_DESIGN ? <ViewIcon /> : <EditIcon />}
      onClick={() => {
        dispatch('TOGGLE_EDIT_MODE')(null);
      }}
    />
  );
};
