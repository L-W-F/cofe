import React from 'react';
import { Box, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, DuplicateIcon } from '@cofe/icons';
import { useDndState } from '@/store/dnd';
import { useTreeNodeActions } from '@/store/editor';

export const ContextMenu = ({ isOpen, onClose, x, y }) => {
  const { selected } = useDndState();
  const { remove, duplicate } = useTreeNodeActions();

  return (
    <Box pos="fixed" left={x} top={y}>
      <Menu matchWidth size="small" isOpen={isOpen} onClose={onClose}>
        <MenuList minW="initial">
          <MenuItem
            icon={<DuplicateIcon />}
            onClick={() => {
              duplicate(selected);
            }}
          >
            复制
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              remove(selected);
            }}
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
