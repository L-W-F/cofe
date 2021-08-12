import React, { useCallback, useEffect } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { getState } from '../../store';
import { isMac } from '../../utils/isMac';

export const DropMenu = () => {
  const toast = useToast({
    position: 'top',
  });

  const showToast = useCallback(
    (title: string) => {
      const id = 'save-state';

      if (toast.isActive(id)) {
        toast.update(id, { title });
      } else {
        toast({ id, title });
      }
    },
    [toast],
  );

  const keydown = useCallback(
    async (e) => {
      // ctrl+s, ⌘+s
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();

          showToast('saving...');

          await fetch('/api/store', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(getState(['config', 'page'])),
          });
          showToast('saved!');
        }
      }
    },
    [showToast],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [keydown, toast]);

  return (
    <Menu matchWidth size="small">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<ChevronDownIcon />}
        variant="ghost"
      />
      <MenuList minW="initial">
        <MenuItem command="⌘S" onClick={keydown}>
          Save
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
