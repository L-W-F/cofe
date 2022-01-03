import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListItem,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DesignIcon, PagesIcon } from '@cofe/icons';
import { Confirm } from '@cofe/ui';
import { EditApp } from './EditApp';
import { EditPage } from './EditPage';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';
import { useAppState } from '@/store/app';
import { useEditorId, useSwitchPage } from '@/store/editor';

export const AppSettings = () => {
  const { pages, removePage } = useAppState();
  const id = useEditorId();
  const switchPage = useSwitchPage();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}M`,
    useCallback(
      (e) => {
        e.preventDefault();
        onOpen();
      },
      [onOpen],
    ),
  );

  const entries = Object.entries(pages);
  const canDelete = entries.length > 1;

  return (
    <>
      <Tooltip
        hasArrow
        label={`应用设置 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}M]`}
      >
        <IconButton
          aria-label="应用设置"
          icon={<PagesIcon />}
          onClick={onOpen}
          variant="ghost"
        />
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>应用设置</DrawerHeader>
          <DrawerBody as={List} spacing={3}>
            {entries.map(([_id, page]) => (
              <ListItem key={_id} as={HStack}>
                <Box flex={1}>{page.title}</Box>
                <EditPage page={page} />
                {canDelete && (
                  <Confirm
                    onConfirm={() => {
                      removePage(page);
                    }}
                    title="删除页面"
                    content={`确定删除「${page.title}」吗？`}
                  >
                    <IconButton
                      aria-label="删除页面"
                      icon={<DeleteIcon />}
                      variant="ghost"
                      colorScheme="error"
                      size="xs"
                    />
                  </Confirm>
                )}
                <IconButton
                  aria-label="设计"
                  title="设计"
                  icon={<DesignIcon />}
                  variant="ghost"
                  isDisabled={id === _id}
                  onClick={() => {
                    switchPage(page);

                    onClose();
                  }}
                />
              </ListItem>
            ))}
          </DrawerBody>
          <DrawerFooter as={HStack} justifyContent="space-between">
            <EditApp />
            <EditPage
              trigger={<Button leftIcon={<AddIcon />}>创建页面</Button>}
              page={{ title: '', description: '' }}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  AppSettings.displayName = 'AppSettings';
}
