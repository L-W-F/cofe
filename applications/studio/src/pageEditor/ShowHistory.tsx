import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, RepeatClockIcon } from '@cofe/icons';
import { del, get, put } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { CofeSnapshot } from '@cofe/types';
import { Empty } from '@cofe/ui';
import { dt } from '@cofe/utils';
import { EditorState } from '@/store/editor';
import { MiscState } from '@/store/misc';

export const ShowHistory = ({ isOpen, onClose }) => {
  const is_loading = useStore<MiscState['is_loading']>('misc.is_loading');
  const page_id = useStore<EditorState['page_id']>('editor.page_id');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [snapshots, setSnapshots] = useState<CofeSnapshot[]>([]);

  const isEmpty = snapshots.length === 0;

  const fetchSnapshots = useCallback(() => {
    get(`/api/pages/${page_id}/stack`).then(setSnapshots);
  }, [page_id]);

  const restoreSnapshot = useCallback(
    async (index) => {
      await put(`/api/pages/${page_id}/stack`, snapshots[index]);

      dispatch('PUSH')(snapshots[index]);

      toast({
        title: '已还原指定版本',
      });
    },
    [page_id, snapshots, dispatch, toast],
  );

  const deleteSnapshot = useCallback(
    async (index) => {
      await del(`/api/pages/${page_id}/stack/${index}`);

      const val = [...snapshots];

      val.splice(index, 1);

      setSnapshots(val);

      toast({
        title: '已删除指定版本',
      });
    },
    [page_id, snapshots, toast],
  );

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchSnapshots();
    }
  }, [fetchSnapshots, isEmpty, isOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>历史版本</DrawerHeader>
        <DrawerBody>
          {isEmpty ? (
            is_loading ? null : (
              <Empty my={8} />
            )
          ) : (
            <List display="flex" flexDirection="column">
              {snapshots?.map(({ created_at }, index) => {
                return (
                  <ListItem
                    as={HStack}
                    justifyContent="space-between"
                    key={created_at ?? index}
                  >
                    <Box flex={1}>
                      {dt(created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </Box>
                    <IconButton
                      aria-label="还原到此版本"
                      size="xs"
                      icon={<RepeatClockIcon />}
                      variant="ghost"
                      isDisabled={is_loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        restoreSnapshot(index);
                      }}
                    />
                    <IconButton
                      aria-label="删除此版本"
                      size="xs"
                      icon={<DeleteIcon />}
                      variant="ghost"
                      colorScheme="red"
                      isDisabled={is_loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSnapshot(index);
                      }}
                    />
                  </ListItem>
                );
              }) ?? null}
            </List>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
