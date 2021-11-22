import React from 'react';
import { Box, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { DeleteIcon, DuplicateIcon } from '@cofe/icons';
import { useValue } from '@/store';
import { useEditorActions } from '@/hooks/useEditor';
import { DndState } from '@/store/dnd';

export const ContextMenu = ({ isOpen, onClose, x, y }) => {
  const selected = useValue<DndState['selected']>('dnd.selected');
  const { deleteNode, duplicateNode } = useEditorActions();

  return (
    <Box pos="fixed" left={x} top={y}>
      <Menu matchWidth size="small" isOpen={isOpen} onClose={onClose}>
        <MenuList minW="initial">
          <MenuItem
            icon={<DuplicateIcon />}
            onClick={() => {
              duplicateNode(selected);
            }}
          >
            复制
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              deleteNode(selected);
            }}
          >
            删除
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
