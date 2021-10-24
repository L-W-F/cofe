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
import {
  AddIcon,
  ChevronRightIcon,
  DesignIcon,
  SpinnerIcon,
} from '@cofe/icons';
import { get } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { Empty, Toolbar } from '@cofe/ui';
import { DeletePage } from './DeletePage';
import { EditPage } from './EditPage';
import { useIsLoading } from '@/hooks/useIsLoading';
import { AppState } from '@/store/app';

interface PageManagerProps {
  app: AppState[string];
  closeParent: () => void;
}

export const PageManager = ({ app, closeParent }: PageManagerProps) => {
  const is_loading = useIsLoading();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id: app_id, pages = {} } = app;
  const isEmpty = !pages || Object.keys(pages).length === 0;

  const fetchPages = useCallback(() => {
    dispatch('FETCH_PAGES')(get(`/api/apps/${app_id}/pages`));
  }, [app_id, dispatch]);

  useEffect(() => {
    if (isEmpty && isOpen) {
      fetchPages();
    }
  }, [fetchPages, isEmpty, isOpen]);

  return (
    <>
      <IconButton
        aria-label="查看页面"
        size="xs"
        icon={<ChevronRightIcon boxSize="6" />}
        variant="ghost"
        isDisabled={is_loading}
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
                isLoading={is_loading}
                isDisabled={is_loading}
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
              />
            </Toolbar>
            {isEmpty ? (
              is_loading ? null : (
                <Empty my={8} />
              )
            ) : (
              <List mt={3} spacing={3}>
                {Object.entries(pages).map(([id, page]) => (
                  <ListItem key={id} as={HStack}>
                    <Box flex={1}>{page.title}</Box>
                    <EditPage page={page} />
                    <DeletePage page={page} />
                    <IconButton
                      aria-label="设计"
                      icon={<DesignIcon />}
                      variant="ghost"
                      size="xs"
                      isDisabled={is_loading}
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
