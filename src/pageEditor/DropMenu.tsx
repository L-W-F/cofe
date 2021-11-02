import React, { useCallback, useEffect, useState } from 'react';
import { HamburgerIcon } from '@cofe/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { post } from '@cofe/io';
import { useStore } from '@cofe/store';
import { isMac } from '@cofe/utils';
import { SaveTemplate } from './SaveTemplate';
import { ShowHistory } from './ShowHistory';
import { EditorState } from '@/store/editor';

export const DropMenu = () => {
  const { page_id, stack, cursor } = useStore<EditorState>('editor');
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [open, setOpen] = useState<'template' | 'history'>(null);

  const saveCurrent = useCallback(async () => {
    if (stack.length > 1) {
      await post(`/api/pages/${page_id}/stack`, stack[cursor]);
    }

    toast({
      title: '所有更改已保存',
    });
  }, [stack, cursor, toast, page_id]);

  const saveTemplate = useCallback(() => {
    setOpen('template');
  }, []);

  const showHistory = useCallback(() => {
    setOpen('history');
  }, []);

  const keydown = useCallback(
    async (e: KeyboardEvent) => {
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();

          // ctrl+⇧?+s, ⌘+⇧?+s
          if (e.shiftKey) {
            setOpen('template');
          } else {
            saveCurrent();
          }
        }

        // ctrl+h, ⌘+h
        if (e.key.toLowerCase() === 'h') {
          e.preventDefault();

          showHistory();
        }
      }
    },
    [saveCurrent, showHistory],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [keydown]);

  return (
    <>
      <Menu matchWidth size="small">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="ghost"
        />
        <MenuList minW="initial">
          <MenuItem
            command="⌘S"
            isDisabled={stack.length <= 1}
            onClick={saveCurrent}
          >
            保存
          </MenuItem>
          <MenuItem command="⌘⇧S" onClick={saveTemplate}>
            保存为模板
          </MenuItem>
          <MenuDivider />
          <MenuItem command="⌘H" onClick={showHistory}>
            历史版本
          </MenuItem>
        </MenuList>
      </Menu>
      <ShowHistory
        isOpen={open === 'history'}
        onClose={() => {
          setOpen(null);
        }}
      />
      <SaveTemplate
        isOpen={open === 'template'}
        onClose={() => {
          setOpen(null);
        }}
      />
    </>
  );
};