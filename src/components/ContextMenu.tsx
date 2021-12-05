import React, { useCallback } from 'react';
import { Box, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, DuplicateIcon } from '@cofe/icons';
import {
  CHAR_ALT_KEY,
  CHAR_BACKSPACE_KEY,
  CHAR_COMMAND_KEY,
  useShortcut,
} from '@/hooks/useShortcut';
import { useDndState } from '@/store/dnd';
import { useTreeNodeActions } from '@/store/editor';

export const ContextMenu = ({ isOpen, onClose, x, y }) => {
  const { selected } = useDndState();
  const { remove, duplicate } = useTreeNodeActions();

  useShortcut(
    `${CHAR_ALT_KEY}D`,
    useCallback(
      (e) => {
        e.preventDefault();
        duplicate(selected);
      },
      [duplicate, selected],
    ),
  );

  return (
    <Box pos="fixed" left={x} top={y}>
      <Menu matchWidth size="small" isOpen={isOpen} onClose={onClose}>
        <MenuList minW="initial">
          <MenuItem
            icon={<DuplicateIcon />}
            onClick={() => {
              duplicate(selected);
            }}
            command={`${CHAR_ALT_KEY}D`}
          >
            复制
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              remove(selected);
            }}
            command={`${CHAR_COMMAND_KEY}${CHAR_BACKSPACE_KEY}`}
          >
            删除
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

if (process.env.NODE_ENV === 'development') {
  ContextMenu.displayName = 'ContextMenu';
}
