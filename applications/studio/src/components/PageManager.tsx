import React, { useCallback, useEffect, useState } from 'react';
import { AddIcon, ChevronRightIcon, SpinnerIcon } from '@chakra-ui/icons';
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
import { DesignIcon } from '@cofe/icons';
import { get, subscribe } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { Empty, Toolbar } from '@cofe/ui';
import { DeletePage } from './DeletePage';
import { EditPage } from './EditPage';
import { AppState } from '@/store/app';

interface PageManagerProps {
  app: AppState[string];
  isDisabled: boolean;
  closeParent: () => void;
}

export const PageManager = ({
  app,
  isDisabled,
  closeParent,
}: PageManagerProps) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const { id: app_id, pages = {} } = app;
  const isEmpty = !pages || Object.keys(pages).length === 0;

  const fetchPages = useCallback(() => {
    dispatch('FETCH_PAGES')(get(`/api/apps/${app_id}/pages`));
  }, [app_id, dispatch]);

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchPages();
    } else {
      setIsLoading(false);
    }
  }, [fetchPages, isEmpty, isOpen]);

  useEffect(() => {
    return subscribe((type) => {
      setIsLoading(type === 'start');
    });
  }, []);

  return (
    <>
      <IconButton
        aria-label="查看页面"
        size="xs"
        icon={<ChevronRightIcon boxSize="6" />}
        variant="ghost"
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>页面</DrawerHeader>
          <DrawerBody>
            <Toolbar size="sm" px={0}>
              <IconButton
                aria-label="刷新"
                icon={<SpinnerIcon />}
                variant="outline"
                size="sm"
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={fetchPages}
              />
              <Box flex={1} />
              <EditPage
                trigger={
                  <Button leftIcon={<AddIcon />} variant="outline" size="sm">
                    创建新页面
                  </Button>
                }
                page={{ title: '', description: '' }}
                isDisabled={isLoading}
              />
            </Toolbar>
            {isEmpty ? (
              isLoading ? null : (
                <Empty my={8} />
              )
            ) : (
              <List mt={3} spacing={3}>
                {Object.entries(pages).map(([id, page]) => (
                  <ListItem key={id} as={HStack}>
                    <Box flex={1}>{page.title}</Box>
                    <IconButton
                      aria-label="设计"
                      icon={<Icon as={DesignIcon} w="3" h="3" />}
                      variant="ghost"
                      size="xs"
                      isDisabled={isLoading}
                      onClick={() => {
                        get(`/api/pages/${id}/tree`).then((tree) => {
                          dispatch('SET_PAGE')({
                            app_id: app.id,
                            page_id: id,
                            stack: [tree],
                          });

                          onClose();
                          closeParent();
                        });
                      }}
                    />
                    <EditPage page={page} isDisabled={isLoading} />
                    <DeletePage page={page} isDisabled={isLoading} />
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
