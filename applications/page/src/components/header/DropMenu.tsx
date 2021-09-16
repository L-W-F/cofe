import React, { useCallback, useEffect } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  AlertStatus,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
// import { getState } from '@cofe/store';
import { isMac } from '@cofe/utils';
import { useToast } from '../../hooks/useToast';
// import { pick } from 'lodash/fp';

export const DropMenu = () => {
  const toast = useToast('save');

  const keydown = useCallback(
    async (e) => {
      // ctrl+s, ⌘+s
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();

          toast('saving...');

          // await fetch('/api/store', {
          //   method: 'PUT',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(
          //     pick(['config', 'editor', 'pages'])(getState()),
          //   ),
          // });
          toast('saved!', 'success');
        }
      }
    },
    [toast],
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
