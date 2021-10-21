import React, { useCallback, useEffect, useState } from 'react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  List,
  ListIcon,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import { get, put, subscribe } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Empty } from '@cofe/ui';
import { dt } from '@cofe/utils';
import { EditorState } from '@/store/editor';

export const ShowHistory = ({ isOpen, onClose }) => {
  const page_id = useStore<EditorState['page_id']>('editor.page_id');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [snapshots, setSnapshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchSnapshots();
    } else {
      setIsLoading(false);
    }
  }, [fetchSnapshots, isEmpty, isOpen]);

  useEffect(() => {
    return subscribe((type) => {
      setIsLoading(type === 'start');
    });
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>历史版本</DrawerHeader>
        <DrawerBody>
          {isEmpty ? (
            isLoading ? null : (
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
                    <Box>{dt(created_at).format('YYYY-MM-DD HH:mm:ss')}</Box>
                    <ListIcon
                      aria-label="还原"
                      as={RepeatClockIcon}
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        restoreSnapshot(index);
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
