import React from 'react';
import { ViewIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { DesignIcon, JsonIcon } from '@cofe/icons';
import { useDispatch, useStore } from '@cofe/store';
import {
  EditorState,
  MODE_DESIGN,
  MODE_PREVIEW,
  MODE_SOURCE,
} from '@/store/editor';

export const ModeSwitch = () => {
  const mode = useStore<EditorState['mode']>('editor.mode');
  const dispatch = useDispatch();

  return (
    <ButtonGroup isAttached variant="outline">
      <IconButton
        aria-label="设计模式"
        title="设计模式"
        icon={<DesignIcon />}
        isDisabled={mode === MODE_DESIGN}
        onClick={() => {
          dispatch('SET_MODE')(MODE_DESIGN);
        }}
      />
      <IconButton
        aria-label="源码模式"
        title="源码模式"
        icon={<JsonIcon />}
        isDisabled={mode === MODE_SOURCE}
        onClick={() => {
          dispatch('SET_MODE')(MODE_SOURCE);
        }}
      />
      <IconButton
        aria-label="预览模式"
        title="预览模式"
        icon={<ViewIcon />}
        isDisabled={mode === MODE_PREVIEW}
        onClick={() => {
          dispatch('SET_MODE')(MODE_PREVIEW);
        }}
      />
    </ButtonGroup>
  );
};
