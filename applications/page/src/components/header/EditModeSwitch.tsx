import React from 'react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useDispatch, useStore } from '@cofe/store';

export const EditModeSwitch = () => {
  const isEditorMode = useStore('config.editMode');
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="Toggle edit mode"
      variant="ghost"
      icon={isEditorMode ? <ViewIcon /> : <EditIcon />}
      onClick={() => {
        dispatch('TOGGLE_EDIT_MODE')(null);
      }}
    />
  );
};
