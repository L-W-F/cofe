import React from 'react';
import { Box, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, DuplicateIcon } from '@cofe/icons';
import { useDispatch, useStore } from '@cofe/store';
import { DndState } from '@/store/dnd';

export const ContextMenu = ({ isOpen, onClose, x, y }) => {
  const selected = useStore<DndState['selected']>('dnd.selected');
  const dispatch = useDispatch();

  return (
    <Box pos="fixed" left={x} top={y}>
      <Menu matchWidth size="small" isOpen={isOpen} onClose={onClose}>
        <MenuList minW="initial">
          <MenuItem
            icon={<DuplicateIcon />}
            onClick={() => {
              dispatch('DUPLICATE_NODE')(selected);
            }}
          >
            复制
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              dispatch('DELETE_NODE')(selected);
            }}
          >
            删除
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
