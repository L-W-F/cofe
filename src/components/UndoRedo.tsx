import React, { useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@cofe/icons';
import { useDispatch, useStore } from '@cofe/store';
import { isMac } from '@cofe/utils';
import { EditorState } from '@/store/editor';

export const UndoRedo = () => {
  const { stack, cursor } = useStore<EditorState>('editor');
  const dispatch = useDispatch();

  useEffect(() => {
    const keydown = (e) => {
      // ctrl+z, ctrl+shift+z, ⌘+z, ⌘+⇧+z
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault();
          dispatch(e.shiftKey ? 'REDO' : 'UNDO')(null);
        } else if (e.key.toLowerCase() === 'y') {
          e.preventDefault();
          dispatch(!e.shiftKey ? 'REDO' : 'UNDO')(null);
        }
      }
    };

    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [dispatch]);

  return (
    <>
      <IconButton
        aria-label="撤销（⌘z）"
        title="撤销（⌘z）"
        variant="ghost"
        icon={<ChevronLeftIcon />}
        disabled={cursor === stack.length - 1}
        onClick={() => {
          dispatch('UNDO')(null);
        }}
      />
      <IconButton
        aria-label="重做（⌘⇧z）"
        title="重做（⌘⇧z）"
        variant="ghost"
        icon={<ChevronRightIcon />}
        disabled={cursor === 0}
        onClick={() => {
          dispatch('REDO')(null);
        }}
      />
    </>
  );
};
