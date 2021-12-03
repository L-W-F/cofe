import React, { useCallback } from 'react';
import { IconButton } from '@chakra-ui/react';
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
        undo();
      },
      [undo],
    ),
  );

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}Z`,
    useCallback(
      (e) => {
        e.preventDefault();
        redo();
      },
      [redo],
    ),
  );

  return (
    <>
      <IconButton
        aria-label="撤销"
        title={`撤销 [${CHAR_COMMAND_KEY}Z]`}
        variant="ghost"
        icon={<ChevronLeftIcon />}
        disabled={!canUndo}
        onClick={undo}
      />
      <IconButton
        aria-label="重做"
        title={`重做 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}Z]`}
        variant="ghost"
        icon={<ChevronRightIcon />}
        disabled={!canRedo}
        onClick={redo}
      />
    </>
  );
};
