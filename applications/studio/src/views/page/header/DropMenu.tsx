import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { getState } from '@cofe/store';
import { isMac } from '@cofe/utils';
// import { pick } from 'lodash';
import { patch } from 'utils/io';

export const DropMenu = () => {
  const { query } = useRouter();

  const keydown = useCallback(
    async (e) => {
      // ctrl+s, ⌘+s
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          await patch(`/api/pages/${query.id}`, getState());
        }
      }
    },
    [query.id],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [keydown]);

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
          保存
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
