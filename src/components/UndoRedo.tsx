import React, { useCallback } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@cofe/icons';
import { useEditor } from '@/hooks/useEditor';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';

export const UndoRedo = () => {
  const { stack, cursor, undo, redo } = useEditor();

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
        disabled={cursor === stack.length - 1}
        onClick={undo}
      />
      <IconButton
        aria-label="重做"
        title={`重做 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}Z]`}
        variant="ghost"
        icon={<ChevronRightIcon />}
        disabled={cursor === 0}
        onClick={redo}
      />
    </>
  );
};
