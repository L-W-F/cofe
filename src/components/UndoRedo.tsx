import React, { useCallback } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@cofe/icons';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';
import { useStackActions } from '@/store/editor';

export const UndoRedo = () => {
  const { canUndo, canRedo, undo, redo } = useStackActions();

  useShortcut(
    `${CHAR_COMMAND_KEY}Z`,
    useCallback(
      (e) => {
        e.preventDefault();
        canUndo && undo();
      },
      [canUndo, undo],
    ),
  );

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}Z`,
    useCallback(
      (e) => {
        e.preventDefault();
        canRedo && redo();
      },
      [canRedo, redo],
    ),
  );

  return (
    <>
      <Tooltip hasArrow label={`撤销 [${CHAR_COMMAND_KEY}Z]`}>
        <IconButton
          aria-label="撤销"
          variant="ghost"
          icon={<ChevronLeftIcon />}
          disabled={!canUndo}
          onClick={undo}
        />
      </Tooltip>
      <Tooltip hasArrow label={`重做 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}Z]`}>
        <IconButton
          aria-label="重做"
          variant="ghost"
          icon={<ChevronRightIcon />}
          disabled={!canRedo}
          onClick={redo}
        />
      </Tooltip>
    </>
  );
};
