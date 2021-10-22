import React, { useCallback, useEffect, useState } from 'react';
import { AddIcon, SpinnerIcon } from '@chakra-ui/icons';
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
  Icon,
  IconButton,
  List,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import { CofeIcon } from '@cofe/icons';
import { get, subscribe } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Empty, Toolbar } from '@cofe/ui';
import { DeleteApp } from './DeleteApp';
import { EditApp } from './EditApp';
import { PageManager } from './PageManager';
import { AppState } from '@/store/app';

export const AppManager = () => {
  const apps = useStore<AppState>('app');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = Object.keys(apps).length === 0;

  const fetchApps = useCallback(() => {
    dispatch('FETCH_APPS')(get('/api/apps'));
  }, [dispatch]);

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchApps();
    } else {
      setIsLoading(false);
    }
  }, [fetchApps, isEmpty, isOpen]);

  useEffect(() => {
    return subscribe((type) => {
      setIsLoading(type === 'start');
    });
  }, []);

  return (
    <>
      <IconButton
        aria-label="Options"
        icon={<Icon as={CofeIcon} w="6" h="6" />}
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
                isLoading={isLoading}
                isDisabled={isLoading}
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
                isDisabled={isLoading}
              />
            </Toolbar>
            {isEmpty ? (
              isLoading ? null : (
                <Empty my={8} />
              )
            ) : (
              <List mt={3} spacing={3}>
                {Object.entries(apps).map(([id, app]) => (
                  <ListItem key={id} as={HStack}>
                    <Box flex={1}>{app.title}</Box>
                    <EditApp app={app} isDisabled={isLoading} />
                    <DeleteApp app={app} isDisabled={isLoading} />
                    <PageManager
                      app={app}
                      isDisabled={isLoading}
                      closeParent={onClose}
                    />
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