import React from 'react';
import { ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import { DesignIcon, JsonIcon, ViewIcon } from '@cofe/icons';
import { useRecoilState } from 'recoil';
import {
  editorModeState,
  MODE_DESIGN,
  MODE_PREVIEW,
  MODE_SOURCE,
} from '@/store/editor';

export const ModeSwitch = () => {
  const [mode, setMode] = useRecoilState(editorModeState);

  return (
    <ButtonGroup isAttached variant="outline">
      <Tooltip hasArrow label="设计模式">
        <IconButton
          aria-label="设计模式"
          icon={<DesignIcon />}
          isDisabled={mode === MODE_DESIGN}
          mr="-1px"
          onClick={() => {
            setMode(MODE_DESIGN);
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label="源码模式">
        <IconButton
          aria-label="源码模式"
          icon={<JsonIcon />}
          isDisabled={mode === MODE_SOURCE}
          mr="-1px"
          onClick={() => {
            setMode(MODE_SOURCE);
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label="预览模式">
        <IconButton
          aria-label="源码模式"
          icon={<ViewIcon />}
          isDisabled={mode === MODE_PREVIEW}
          onClick={() => {
            setMode(MODE_PREVIEW);
          }}
        />
      </Tooltip>
    </ButtonGroup>
  );
};

if (process.env.NODE_ENV === 'development') {
  ModeSwitch.displayName = 'ModeSwitch';
}
