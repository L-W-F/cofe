import React, { useCallback, useEffect } from 'react';
import {
  Box,
  Button,
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
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, CofeIcon, SpinnerIcon } from '@cofe/icons';
import { get } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Empty, Toolbar } from '@cofe/ui';
import { DeleteApp } from './DeleteApp';
import { EditApp } from './EditApp';
import { PageManager } from './PageManager';
import { useIsLoading } from '@/hooks/useIsLoading';
import { AppState } from '@/store/app';

export const AppManager = () => {
  const is_loading = useIsLoading();
  const apps = useStore<AppState>('app');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isEmpty = Object.keys(apps).length === 0;

  const fetchApps = useCallback(() => {
    dispatch('FETCH_APPS')(get('/api/apps'));
  }, [dispatch]);

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchApps();
    }
  }, [fetchApps, isEmpty, isOpen]);

  return (
    <>
      <IconButton
        aria-label="Options"
        icon={<CofeIcon />}
        variant="ghost"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>应用</DrawerHeader>
          <DrawerBody>
            <Toolbar size="sm" px={0}>
              <IconButton
                aria-label="刷新"
                icon={<SpinnerIcon />}
                variant="outline"
                size="sm"
                isLoading={is_loading}
                isDisabled={is_loading}
                onClick={fetchApps}
              />
              <Box flex={1} />
              <EditApp
                trigger={
                  <Button leftIcon={<AddIcon />} variant="outline" size="sm">
                    创建新应用
                  </Button>
                }
                app={{
                  title: '',
                  description: '',
                }}
              />
            </Toolbar>
            {isEmpty ? (
              is_loading ? null : (
                <Empty my={8} />
              )
            ) : (
              <List mt={3} spacing={3}>
                {Object.entries(apps).map(([id, app]) => (
                  <ListItem key={id} as={HStack}>
                    <Box flex={1}>{app.title}</Box>
                    <EditApp app={app} />
                    <DeleteApp app={app} />
                    <PageManager app={app} closeParent={onClose} />
                  </ListItem>
                ))}
              </List>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
